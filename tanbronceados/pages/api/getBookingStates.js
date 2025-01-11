import BookingModel from '../../models/BookingModel';

export default async function bookingStatesHandler(req, res) {
    try {
      // Obtener los valores del ENUM directamente del modelo BookingModel
      const bookingStateEnum = BookingModel.raw.rawAttributes.BookingState.type.values;
      res.status(200).json({ states: bookingStateEnum });
    } catch (error) {
      console.error('Error al obtener estados de reserva:', error);
      res.status(500).json({ message: 'Error al obtener estados de reserva.', error: error.message });
    }
  }
  