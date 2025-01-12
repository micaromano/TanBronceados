import { BookingModel, ServiceModel }  from '../../models';
import { Op } from 'sequelize';


export default async function disableTimeSlotHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { fechaDesde, horarioDesde, fechaHasta, horarioHasta, servicioID } = req.body;

  // Validación de los parámetros
  if (!fechaDesde || !horarioDesde || !fechaHasta || !horarioHasta || !servicioID) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Crear las fechas y horas combinadas para BookingDateTime
    const fromDateTime = new Date(`${fechaDesde}T${horarioDesde}`);
    const toDateTime = new Date(`${fechaHasta}T${horarioHasta}`);

    if (isNaN(fromDateTime.getTime()) || isNaN(toDateTime.getTime())) {
      return res.status(400).json({ error: 'Los valores de fecha y hora no son válidos' });
    }

    // Validar que el rango de tiempo sea válido
    if (fromDateTime >= toDateTime) {
      return res.status(400).json({ error: 'El "HorarioDesde" debe ser anterior al "HorarioHasta" y "FechaDesde" debe ser anterior o igual a "FechaHasta"' });
    }

    // Obtener la duración del servicio
    const service = await ServiceModel.raw.findByPk(servicioID);
    if (!service) {
      return res.status(404).json({ error: 'El servicio especificado no existe' });
    }

    const serviceDuration = service.duration; // Está en minutos

    // Calcular la cantidad máxima de reservas que pueden caber en el período
    const totalMinutes = (toDateTime - fromDateTime) / (1000 * 60); // Diferencia en minutos
    const maxReservations = Math.ceil(totalMinutes / serviceDuration);

    if (maxReservations <= 0) {
      return res.status(400).json({ error: 'El rango de tiempo es demasiado corto para el servicio seleccionado' });
    }

    // Verificar solapamiento con otras reservas
    const overlappingBookings = await BookingModel.raw.findAll({
      where: {
        BookingType: 'HorarioNoDisponible',
        [Op.or]: [
          {
            BookingDateTime: {
              [Op.between]: [fromDateTime, toDateTime],
            },
          },
          {
            [Op.and]: [
              { BookingDateTime: { [Op.lte]: fromDateTime } },
              { BookingTime: { [Op.gte]: horarioHasta } },
            ],
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ error: 'El horario ingresado se solapa con un horario no disponible existente' });
    }

    // Crear las reservas necesarias dentro del período
    const reservations = [];
    for (let i = 0; i < maxReservations; i++) {
      const reservationStart = new Date(fromDateTime.getTime() + i * serviceDuration * 60 * 1000);
      const reservationEnd = new Date(reservationStart.getTime() + serviceDuration * 60 * 1000);

      if (reservationEnd > toDateTime) break;

      const newBooking = await BookingModel.raw.create({
        BookingDate: reservationStart.toISOString().split('T')[0],
        BookingTime: reservationStart.toTimeString().split(' ')[0],
        BookingDateTime: reservationStart,
        BookingType: 'HorarioNoDisponible',
        BookingState: 'Finalizado',
        service: servicio,
      });

      reservations.push(newBooking);
    }

    return res.status(201).json({
      message: 'Horarios no disponibles creados exitosamente',
      bookings: reservations,
    });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}