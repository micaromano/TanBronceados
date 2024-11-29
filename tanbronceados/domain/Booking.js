const BookingRepository = require('../repository/bookingRepository.js');

class Booking {
  constructor(newAppointment) {
    this.id = newAppointment.id;
    this.date = newAppointment.date;
    this.time = newAppointment.time;
    this.client = newAppointment.client; // Composition
    this.state = newAppointment.state;
  }
  // Check if the reservation is available
  async isAvailable() {
    return !!(await BookingRepository.isAvailable(this));
  }

  async createAppointment() {
    const available = await this.isAvailable();
    if (!available) throw new Error('La cita no está disponible');
    return await BookingRepository.createAppointment(this);
  }

  toString() {
    return `Booking: ${this.id} - ${this.date} - ${this.time} - ${this.client.toString()} - ${this.state}`;
  }
}

module.exports = Booking;