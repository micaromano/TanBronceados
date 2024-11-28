const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

class ClientModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('Client', {
      ClientID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      PasswordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Instagram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // La cuenta estará inactiva por defecto
      },
      createdAt: {
        type: DataTypes.DATE, // Se asegura usar un tipo DATE sin zona horaria
        allowNull: false,
        defaultValue: db.literal('GETDATE()'), // Usa la fecha actual del servidor
      },
      updatedAt: {
        type: DataTypes.DATE, // Se asegura usar un tipo DATE sin zona horaria
        allowNull: false,
        defaultValue: db.literal('GETDATE()'), // Usa la fecha actual del servidor
      },
    }, {
      tableName: 'Clients',  // Nombre de la tabla
      timestamps: true,  // Activa las columnas createdAt y updatedAt
      freezeTableName: true,
    });
  }

  get raw() {
    return this.#rawModel;
  }
}

// associate(models) {
//   // Relacion con Booking
//   this.raw.hasMany(models.BookingModel.raw, { foreignKey: 'ClientId', onDelete: 'CASCADE' });
// }

module.exports = new ClientModel();


//   // Método de asociación, si necesitas relacionarlo con otros modelos
//   associate(models) {
//     // Ejemplo de asociación, ajusta según las relaciones de tu proyecto
//     // this.raw.belongsTo(models.AnotherModel.raw, { foreignKey: 'anotherId' });
//   }
// }