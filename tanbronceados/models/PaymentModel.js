const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

class PaymentModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('Payment', {
      PaymentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      AmountPaid: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      PaymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PaymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'Payments',  // Nombre de la tabla
      timestamps: true,  // Activa las columnas createdAt y updatedAt
      freezeTableName: true,
    });
  }

  get raw() {
    return this.#rawModel;
  }

  associate(models) {
      //Relacion con Session
      this.raw.hasMany(models.SessionModel.raw, { foreignKey: 'SessionID', as: 'sessions' });
      //Relacion con Booking
      this.raw.belongsTo(models.BookingModel.raw, { foreignKey: 'BookingID', as: 'booking' });
      //Relacion con DiscountCoupon
      this.raw.belongsTo(models.DiscountCouponModel.raw, { foreignKey: 'DiscountCouponID', as: 'discountCoupon' });
  }

}


// // // Método de asociación, si necesitas relacionarlo con otros modelos
// // associate(models) {
// //   // Ejemplo de asociación, ajusta según las relaciones de tu proyecto
// //   this.raw.belongsTo(models.AnotherModel.raw, { foreignKey: 'anotherId' });
// // }

module.exports = new PaymentModel();