const nodemailer = require('nodemailer');
const cron = require('node-cron');
const globals = require('../../../config/globals');
const AutomatedNotificationModel = require('../../../models/AutomatedNotificationModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: globals.email_user,
    pass: globals.pass_user,
  },
});

async function sendEmail(from, to, title, message, attachments) {
  const mailOptions = {
    from,
    to,
    subject: title,
    html: `<div>${message}</div>`,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado.');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
}

function scheduleNotification(from, notification, automatedNotification) {
  console.log('notification', notification);
   const dateOnly = notification.ScheduledDate.toISOString().split("T")[0]
   const [year, month, day] = dateOnly.split("-"); // Desglosar la fecha 
 
   const cronPattern = `${notification.ScheduledTime.getUTCSeconds() || 0} ${notification.ScheduledTime.getUTCMinutes()} ${notification.ScheduledTime.getUTCHours()} ${day} ${parseInt(month)} *`;
 
   cron.schedule(cronPattern, async () => {
    try {
      if(automatedNotification != null){        
        // Obtener la notificación actualizada desde la base de datos
        const updatedNotification = await AutomatedNotificationModel.raw.findOne({
          where: { AutomatedNotificationID: automatedNotification.AutomatedNotificationID },
        });
    
        if (!updatedNotification) {
          console.error(`Notificación ${automatedNotification.AutomatedNotificationID} no encontrada.`);
          return;
        }
        
        // Enviar la notificación actualizada
        await sendEmail(from, notification.NotificationTo, updatedNotification.AutomatedNotificationTitle, updatedNotification.AutomatedNotificationMessage);
        console.log(`Notificación ${updatedNotification.AutomatedNotificationID} enviada con contenido actualizado.`);
      
      } else {
        await sendEmail(from, notification.NotificationTo, notification.NotificationTitle, notification.NotificationMessage);
      }

    } catch (error) {
      console.error(`Error enviando la notificación ${notification.AutomatedNotificationID}:`, error);
    }
     console.log(`Notificación ${notification.NotificationID} enviada.`);
   });
 }

async function scheduleEditAutomaticNotification(notificationID, notificationTitle, notificationMessage, scheduledDate) {
   const [datePart, timePart] = scheduledDate.split('T');
   const [year, month, day] = datePart.split("-"); // Desglosar la fecha 
   const [hours, minutes] = timePart.split(":"); // Desglosar la hora
   const seconds = '00';
 
   const cronPattern = `${seconds} ${minutes} ${hours} ${day} ${parseInt(month)} *`;
 
   console.log('cronPattern', cronPattern);

   cron.schedule(cronPattern, async () => {
    try {
      const [updatedRows] = await AutomatedNotificationModel.raw.update(
        { AutomatedNotificationTitle: notificationTitle, AutomatedNotificationMessage: notificationMessage }, // Campos a actualizar
        { where: { AutomatedNotificationID: notificationID } } // Condición para encontrar la notificacion
      );
      if (updatedRows === 0) {
        console.error('No se encontró la notificación para actualizar.');
        return;
      }

    } catch (error) {
      console.error('Error al actualizar la notificación:', error);
    }
  });

 }

module.exports = { sendEmail, scheduleNotification, scheduleEditAutomaticNotification };