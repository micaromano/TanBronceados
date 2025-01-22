// api/getBookedSlots.js
import BookingModel from '../../models/BookingModel';
import { Op } from 'sequelize';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { serviceId, date } = req.query; 
    // date vendrá tipo "2025-01-31", serviceId = 3, etc.

    if (!serviceId || !date) {
      return res
        .status(400)
        .json({ success: false, error: 'Faltan parámetros serviceId o date' });
    }

    // Generamos fecha de inicio y fin de ese día
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    // Buscamos todas las reservas de ese servicio y fecha
    const bookings = await BookingModel.raw.findAll({
      where: {
        ServiceID: serviceId,
        BookingDateTime: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    // Transformamos la DateTime a un string HH:mm para poder filtrar
    const usedSlots = bookings.map((b) => {
      const dt = new Date(b.BookingDateTime);
      const hh = dt.getHours().toString().padStart(2, '0');
      const mm = dt.getMinutes().toString().padStart(2, '0');
      return `${hh}:${mm}`;
    });

    return res.status(200).json({
      success: true,
      slots: usedSlots,
    });
  } catch (error) {
    console.error('Error al obtener horarios reservados', error);
    return res
      .status(500)
      .json({ success: false, error: 'Error interno al obtener horarios' });
  }
}
