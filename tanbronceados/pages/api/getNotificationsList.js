import AutomatedNotificationModel from '../../models/AutomatedNotificationModel';

export default async function handler(req, res) {
//export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const notifications = await AutomatedNotificationModel.raw.findAll();  // Esto devuelve un arreglo con todos las notificaciones
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}