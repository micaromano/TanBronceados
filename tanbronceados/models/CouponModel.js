const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Ajusta la ruta a tu archivo de configuración

class CouponModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('Coupon',{
        CouponID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Code: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        DiscountPercentage: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
        },
        ValidFrom: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        ValidTo: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        MinPurchaseAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },        
      },
      {
        tableName: 'Coupons',
        timestamps: true, // createdAt, updatedAt
        freezeTableName: true,
      }
    );
  }

  get raw() {
    return this.#rawModel;
  }

  associate(models) {
    // Si deseas asociar cupones con otros modelos (por ejemplo, un pedido, booking, etc.)
    // this.raw.belongsTo(models.BookingModel.raw, { foreignKey: 'BookingID' });
  }
}

module.exports = new CouponModel();
