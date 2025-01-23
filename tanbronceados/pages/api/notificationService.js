import models from '../../models/ModelsWrapper';
import models from '../../models/ModelsWrapper';
const { scheduleNotification, sendEmail } = require('../api/utils/notification');
const { adjustDate } = require('../api/utils/date');

// Manejar notificación basada en formulario
async function handleFormNotification({ from, to, title, message, isScheduled, scheduledDate }) {
  if (!title.trim() || !message.trim()) {
    throw new Error('Título y mensaje son obligatorios.');
  }

  if (isScheduled) {
    // Guardar notificación programada en la base de datos
    const [datePart, timePart] = scheduledDate.split('T');
    const notification = await models.notificationModel.raw.create({
      NotificationTo: to,
      NotificationTitle: title,
      NotificationMessage: message,
      IsScheduled: true,
      ScheduledDate: datePart,
      ScheduledTime: timePart,
    });

    // Programar envío con cron
    await scheduleNotification(from, notification);
  } else {
    // Enviar notificación inmediata
    await sendEmail(from, to, title, message, '');
  }
}

// Manejar notificación basada en reserva
async function handleBookingNotification(from, bookingObject) {
  //const client = await ClientModel.raw.findOne({ where: { ClientID: bookingObject.ClientID } });
  const client = await models.clientModel.raw.findOne({ where: { ClientID: bookingObject.ClientID } });
  if (!client) throw new Error('Cliente no encontrado.');

  const { BookingDate, BookingTime } = bookingObject;
  const to = client.Email;

  // Enviar notificaciones inmediatas y programadas
  const notifications = [
    { event: 'Confirmación de cita' },
    { event: 'Recordatorio de cita' }, // 24 horas antes
    { event: 'Recomendación post sesion' }, // 15 minutos después
  ];

  for (const { event } of notifications) {

    const automatedNotification = await models.automatedNotificationModel.raw.findOne({
        where: { AutomatedNotificationName: event },
      });

    if (event === 'Confirmación de cita') {
      // Notificación inmediata
      //await sendEmail('martinquartino1313@gmail.com', to, `${automatedNotification.AutomatedNotificationTitle}`, `${automatedNotification.AutomatedNotificationMessage}`);
      await sendEmail(from, to, `${automatedNotification.AutomatedNotificationTitle}`, `${automatedNotification.AutomatedNotificationMessage}`);
    } else {

      const dateTime = adjustDate(BookingDate, BookingTime, event);
        
      // Notificación programada
      const notification = await models.notificationModel.raw.create({
        NotificationTo: to,
        NotificationTitle: `${automatedNotification.AutomatedNotificationTitle}`,
        NotificationMessage: `${automatedNotification.AutomatedNotificationMessage}`,
        IsScheduled: true,
        ScheduledDate: event === 'Recordatorio de cita' ? dateTime : BookingDate,
        ScheduledTime: event === 'Recomendación post sesion' ? dateTime : BookingTime,
      });

      await scheduleNotification(from, notification);
    }
  }
}

module.exports = { handleFormNotification, handleBookingNotification };