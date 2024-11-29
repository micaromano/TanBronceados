const Booking = require('../domain/Booking');

class BookingService {
  static async bookAppointment(newAppointment) {
    const booking = new Booking(newAppointment);
    const result = await booking.createAppointment();
    return result;
  }  
}


module.exports = BookingService;