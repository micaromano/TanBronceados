import ClientModel from '../../models/ClientModel';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const clients = await ClientModel.raw.findAll();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}