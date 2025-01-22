const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

class DiscountCouponModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('DiscountCoupon', {
      DiscountCouponID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CampaignName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      DiscountPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CouponType: {
        type: DataTypes.ENUM('Unico', 'Multiple'),
        allowNull: false,
      },
      // Campo adicional solo para "Unico"
      ExpirationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Solo se usa si el tipo es 'Unico'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // El cupón estará inactivo por defecto
      },
    }, {
      tableName: 'DiscountCoupons',  // Nombre de la tabla
      timestamps: true,  // Activa las columnas createdAt y updatedAt
      freezeTableName: true,
    });
  }

  get raw() {
    return this.#rawModel;
  }

  associate(models) {
    // Relacion con Payment
    this.raw.hasMany(models.PaymentModel.raw, { foreignKey: 'DiscountCouponID', as: 'payments' });
  }

}


//   // Método de asociación, si necesitas relacionarlo con otros modelos
//   associate(models) {
//     // Ejemplo de asociación, ajusta según las relaciones de tu proyecto
//     // this.raw.belongsTo(models.AnotherModel.raw, { foreignKey: 'anotherId' });
//   }
// }

module.exports = new DiscountCouponModel();