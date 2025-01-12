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

// Sincroniza los modelos con la base de datos
// (async () => {
//     try {
        
//       await sequelize.authenticate();
//       console.log('Conexión a la base de datos establecida correctamente.');
//       await sequelize.sync({ alter: false }); // Cambiar a true en desarrollo si se necesita actualizar las tablas sin perder datos
//       console.log('Tablas sincronizadas correctamente.');
//     } catch (error) {
//       console.error('Error al sincronizar las tablas:', error);
//     }
//   })();

module.exports = models;