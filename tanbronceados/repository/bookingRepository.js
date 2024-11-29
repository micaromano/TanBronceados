const { Op } = require('sequelize');
const { clientModel, bookingModel } = require('../models');

class BookingRepository {
  static async isAvailable(newBooking) {
    const booking = await bookingModel.raw.findOne({
      where: {
        Date: newBooking.date,
        Time: newBooking.time,
        State: {
          [Op.notIn]: ['CANCELLED', 'RESCHEDULED'],
        },
      },
    });

    return !booking;
  }

  static async createAppointment(newBooking) {
    const { clientID } = await clientModel.raw.findOne({
      where: {
        Email: newBooking.client.email,
      },
      attributes: ['ClientID'],
    });

    const dbAppointment = await bookingModel.raw.create({
      ClientID: clientID,
      Date: newBooking.date,
      Time: newBooking.time,
    });

    return dbAppointment.toJSON();
  }
}

module.exports = BookingRepository;