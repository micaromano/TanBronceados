// Wrapper for all the models in the application. It allows to import all the models in a single line.
// Example of use: const { adminModel, clientModel } = require('./models/modelsWrapper');
module.exports = {
  adminModel: require('./AdminModel'),
  clientModel: require('./ClientModel'), 
  bookingModel: require('./BookingModel'),
  // TODO: Add the rest of the models here
}
