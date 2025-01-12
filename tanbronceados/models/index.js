const ClientModel = require('./ClientModel');
const SessionModel = require('./SessionModel');
const PaymentModel = require('./PaymentModel');
const BookingModel = require('./BookingModel');
const AdminModel = require('./AdminModel');
const DiscountCouponModel = require('./DiscountCouponModel');
const ServiceModel = require('./ServiceModel');

const models = {
  ClientModel,
  SessionModel,
  PaymentModel,
  BookingModel,
  AdminModel,
  DiscountCouponModel,
  ServiceModel
};

// Configurar asociaciones
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;