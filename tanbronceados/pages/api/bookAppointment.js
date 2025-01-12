import BookingModel from '../../models/BookingModel';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { date, time, state, clientId, sessionId } = req.body; //TODO: session y un servicio

    console.log('req.body = ', req.body); //TODO: Borrar console.log
    if (!date || !time || state === undefined || !clientId || !sessionId) { //TODO: sesion puede ser null y agregar servicio
      return res.status(400).json({
        success: false,
        error: 'Faltan datos requeridos para crear la reserva',
      });
    }

    const formattedDate = new Date(date).toISOString().split('T')[0];
    const formattedTime = time;

    // Crear la reserva en la BD con Sequelize
    const newBooking = await BookingModel.raw.create({
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
