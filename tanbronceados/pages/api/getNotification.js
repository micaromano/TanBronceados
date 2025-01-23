import models from '../../models/ModelsWrapper';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        console.log('id', id);

        try {
            const notification = await models.notificationModel.raw.findOne({ where: { NotificationID: id } });
            if (!notification) {
                return res.status(404).json({ error: 'Notificación no encontrada.' });
            }
            res.status(200).json(notification);
        } catch (error) {
            console.error('Error al obtener la notificación:', error);
            res.status(500).json({ error: 'Error del servidor.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}