const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

class SessionModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('Session', {
      SessionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      SessionPurchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'Session',  // Nombre de la tabla
      timestamps: true,  // Activa las columnas createdAt y updatedAt
      freezeTableName: true,
    });
  }

  get raw() {
    return this.#rawModel;
  }

  associate(models) {
      // Relacion con Client
      this.raw.belongsTo(models.ClientModel.raw, { foreignKey: 'ClientID', as: 'client' });
      // Relacion con Service
      this.raw.belongsTo(models.ServiceModel.raw, { foreignKey: 'ServiceID', as: 'service' });
      // Relacion con Payment
      this.raw.belongsTo(models.PaymentModel.raw, { foreignKey: 'SessionID', as: 'payment' });
      // Relacion con Booking
      this.raw.hasMany(models.BookingModel.raw, { foreignKey: 'SessionID', as: 'bookings' });
  }

}


// //   // Método de asociación, si necesitas relacionarlo con otros modelos
// //   associate(models) {
// //     // Ejemplo de asociación, ajusta según las relaciones de tu proyecto
// //     // this.raw.belongsTo(models.AnotherModel.raw, { foreignKey: 'anotherId' });
// //   }
// // }

module.exports = new SessionModel();
