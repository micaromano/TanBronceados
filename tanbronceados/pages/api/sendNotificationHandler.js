const { handleFormNotification, handleBookingNotification } = require('../api/notificationService');

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { from, to, title, message, isScheduled, scheduledDate, bookingObject } = req.body;

  console.log('req.body', req.body);

  try {
    if (bookingObject) {
      // Procesar notificación basada en una reserva
      await handleBookingNotification(from, bookingObject);
    } else {
      // Procesar notificación basada en formulario
      await handleFormNotification({ from, to, title, message, isScheduled, scheduledDate });
    }

    return res.status(200).json({ message: 'Notificación procesada exitosamente.' });
  } catch (error) {
    console.error('Error procesando la notificación:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
  }
}

module.exports = handler;