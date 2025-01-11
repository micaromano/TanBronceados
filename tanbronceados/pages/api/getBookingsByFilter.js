import BookingModel from '../../models/BookingModel';


export default async function handler(req, res) {
  try {
    const queryParams = { ...req.query };
    // Validar que al menos haya algún parámetro de consulta
    if (Object.keys(queryParams).length === 0) {
        return res.status(400).json({ message: 'Se requiere al menos un parámetro de consulta.' });
    }

    // Obtener reservas con los filtros recibidos
    const bookings = await BookingModel.raw.findAll({
      where: queryParams,
    });

    bookings.forEach(booking => {
      const dateOnly = booking.BookingDateTime.toISOString().split("T")[0]; // "2025-01-12"
      booking.BookingDate = dateOnly
      
      const timeOnly = booking.BookingDateTime.toTimeString().split(" ")[0]; // "10:00:00"
      booking.BookingTime = timeOnly
    });
 
    res.status(200).json({queryParams, bookings});
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas.', error: error.message });
  }
}