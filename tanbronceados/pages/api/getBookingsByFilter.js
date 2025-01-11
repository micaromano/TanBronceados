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

    res.status(200).json({queryParams, bookings});
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas.', error: error.message });
  }
}