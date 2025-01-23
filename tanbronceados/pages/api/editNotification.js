import models from '../../models/ModelsWrapper';

async function handler(req, res) {
//function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { notificationID, notificationTitle, notificationMessage } = req.body;

  console.log('notificationID, notificationTitle, notificationMessage', notificationID, notificationTitle, notificationMessage);

    // Se validan campos antes de procesarlos
    // title

    if (!notificationTitle.trim()) {
      return res.status(404).json({ error: 'El titulo es obligatorio.' });
    } else if (notificationTitle.length < 3) {
      return res.status(404).json({ error: 'El titulo debe tener al menos 3 caracteres.' });
    }

    if (!notificationMessage.trim()) {
      return res.status(404).json({ error: 'El mensaje es obligatorio.' });
    } else if (notificationMessage.length < 3) {
      return res.status(404).json({ error: 'El mensaje debe tener al menos 3 caracteres.' });
    }

    try{

    // Se busca la notificación que se quiere editar
    const notification = await models.automatedNotificationModel.raw.findOne({ where: { AutomatedNotificationID: notificationID } });
    console.log('notification', notification);

    if (!notification) {
      return res.status(404).json({ error: 'Notification no encontrada.' });
    }

    // Edita la notificacion
     const result = await models.automatedNotificationModel.raw.update(
       { AutomatedNotificationTitle: notificationTitle, AutomatedNotificationMessage: notificationMessage }, // Campos a actualizar
       { where: { AutomatedNotificationID: notificationID } } // Condición para encontrar la notificacion
     );
    
    console.log('result', result);

    if (result[0] === 0) {
      return res.status(400).json({ error: 'No se pudo editar la notificación.' });
    }

    return res.status(201).json({ message: 'Notificación editada correctamente.' });
  
    } catch (error) {
      console.error('Error during notification editing:', error);
      return res.status(500).json({ error: 'Error del servidor al editar la notificación.' });
    }
}

module.exports = handler;