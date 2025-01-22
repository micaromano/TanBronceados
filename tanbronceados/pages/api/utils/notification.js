const nodemailer = require('nodemailer');
const cron = require('node-cron');
const globals = require('../../../config/globals');

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

function scheduleNotification(from, notification) {
 console.log('notification', notification);
  const dateOnly = notification.ScheduledDate.toISOString().split("T")[0]
  const [year, month, day] = dateOnly.split("-"); // Desglosar la fecha 

  const cronPattern = `${notification.ScheduledTime.getUTCSeconds() || 0} ${notification.ScheduledTime.getUTCMinutes()} ${notification.ScheduledTime.getUTCHours()} ${day} ${parseInt(month)} *`;

  cron.schedule(cronPattern, async () => {
    //await sendEmail('martinquartino1313@gmail.com', notification.NotificationTo, notification.NotificationTitle, notification.NotificationMessage);
    await sendEmail(from, notification.NotificationTo, notification.NotificationTitle, notification.NotificationMessage);
    console.log(`Notificación ${notification.NotificationID} enviada.`);
  });
}

module.exports = { sendEmail, scheduleNotification };