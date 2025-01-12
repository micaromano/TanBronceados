import BookingModel from '../../models/BookingModel';

export default async function handler(req, res) {
  // Aceptamos únicamente método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Ajustamos nombres en minúscula para evitar colisión con el constructor nativo Date
    const { date, time, state, clientId, sessionId } = req.body;

    console.log('req.body = ', req.body); //TODO: Borrar console.log
    // Validación básica
    if (!date || !time || state === undefined || !clientId || !sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Faltan datos requeridos para crear la reserva',
      });
    }

    // Formatear la fecha a "YYYY-MM-DD"
    const formattedDate = new Date(date).toISOString().split('T')[0];
    // Asumimos que `time` llega en formato "HH:mm"
    const formattedTime = time;

    // Crear la reserva en la BD con Sequelize
    const newBooking = await BookingModel.raw.create({
      // El nombre de columnas en tu DB siguen en mayúscula
      Date: formattedDate,
      Time: formattedTime,
      State: state,
      ClientID: clientId,
      SessionID: sessionId,
    });

    return res.status(201).json({
      success: true,
      data: newBooking,
      message: 'Reserva creada correctamente',
    });
  } catch (error) {
    console.error('Error al crear la reserva:', {
      input: { date, time, state, clientId, sessionId },
      error,
    });

    return res.status(500).json({
      success: false,
      error: 'Error al crear la reserva en el servidor',
    });
  }
}
