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
      bookingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // ID auto-incremental para cada reserva
      },
      clientID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',  // Nombre correcto de la tabla de clientes
          key: 'clientID',   // Llave primaria de la tabla Clients
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      deposit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM('PENDING', 'CANCELLED', 'RESCHEDULED', 'COMPLETED', 'NO_SHOW'),
        allowNull: false,
        defaultValue: 'PENDING',  // Estado predeterminado como 'PENDING'
      },
    }, {
      tableName: 'Booking',
      timestamps: true,
      freezeTableName: true,  
    });
  }

  get raw() {
    return this.#rawModel;
  }

  associate(models) {
    // Relación con Clients (muchos bookings para un cliente)
    this.raw.belongsTo(models.ClientModel.raw, { foreignKey: 'clientID', as: 'client' });

    // Relación con Session (muchos bookings para una sesión)
    this.raw.belongsTo(models.SessionModel.raw, { foreignKey: 'sessionID', as: 'session' });

    // Relación con Payment (un pago por cada reserva)
    this.raw.hasOne(models.PaymentModel.raw, { foreignKey: 'bookingID', as: 'payment' });
  }

}
module.exports = new BookingModel();
