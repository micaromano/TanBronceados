import SessionModel from '../../models/SessionModel';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sessions = await SessionModel.raw.findAll();
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}