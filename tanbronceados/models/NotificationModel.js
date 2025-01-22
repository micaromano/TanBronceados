const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

class NotificationModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('Notification', {
      NotificationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NotificationTo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NotificationTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NotificationMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IsScheduled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ScheduledDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      ScheduledTime: {
        type: DataTypes.TIME,
        allowNull: true,
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
      tableName: 'Notifications',  // Nombre de la tabla
      timestamps: true,  // Activa las columnas createdAt y updatedAt
      freezeTableName: true,
    });
  }

  get raw() {
    return this.#rawModel;
  }

//   associate(models) {
//     //Relacion con Session
//     this.raw.hasMany(models.SessionModel.raw, { foreignKey: 'ServiceID', as: 'sessions' });
//     //Relacion con Service Creado
//     this.raw.belongsTo(models.AdminModel.raw, { foreignKey: 'CreateByID', as: 'creator' });
//     //Relacion con Service Editado
//     this.belongsToMany(models.AdminModel.raw, { through: 'Modifications', foreignKey: 'ServiceID', as: 'modifierAdministrators' });
//     //Relacion con Service Dado de baja
//     this.belongsTo(models.AdminModel.raw, { foreignKey: 'DischargedID', as: 'administratorDischarge' });

// }
   
}

module.exports = new NotificationModel();