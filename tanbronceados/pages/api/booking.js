const BookingService = require('../../services/BookingService');

async function handler(req, res) {
  const { appointment } = req.body;

  try {
    console.log('Reservando cita:', appointment);
    const result = await BookingService.bookAppointment(appointment);
    return res.status(200).json(
      {
        msg: 'Cita reservada exitosamente',
        result
      }
    );
  } catch (error) {
    console.error('Error al reservar cita:', error);
    return res.status(500).json({
      msg: 'Error del servidor',
      error: error.message
    });
  }
}

module.exports = handler;