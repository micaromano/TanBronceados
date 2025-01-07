import BookingModel from '../../models/BookingModel';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const bookings = await BookingModel.raw.findAll();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los reservas' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}