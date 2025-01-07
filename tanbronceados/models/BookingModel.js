const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

class BookingModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('Booking', {
      BookingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      BookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      BookingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      Deposit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BookingState: {
        type: DataTypes.ENUM('Pendiente', 'Finalizada', 'Cancelada', 'No show'),
        allowNull: false,
      },
    }, {
      tableName: 'Bookings',  // Nombre de la tabla
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
      // Relacion con Session (0..N a 1..1)
      this.raw.belongsTo(models.SessionModel.raw, { foreignKey: 'SessionID', as: 'session' });
      // Relacion con Payment
      this.raw.hasOne(models.PaymentModel.raw, { foreignKey: 'PaymentID', as: 'payment' });
  }

}


// //   // Método de asociación, si necesitas relacionarlo con otros modelos
// //   associate(models) {
// //     // Ejemplo de asociación, ajusta según las relaciones de tu proyecto
// //     // this.raw.belongsTo(models.AnotherModel.raw, { foreignKey: 'anotherId' });
// //   }
// // }

module.exports = new BookingModel();