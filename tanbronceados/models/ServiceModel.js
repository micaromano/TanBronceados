const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

class ServiceModel {
  #rawModel;

  constructor() {
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = db.define('Service', {
      ServiceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ServiceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ServiceDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // El servicio estará inactivo por defecto
      },
    }, {
      tableName: 'BusinessServices',  // Nombre de la tabla
      timestamps: true,  // Activa las columnas createdAt y updatedAt
      freezeTableName: true,
    });
  }

  get raw() {
    return this.#rawModel;
  }

  associate(models) {
      //Relacion con Session
      this.raw.hasMany(models.SessionModel.raw, { foreignKey: 'ServiceID', as: 'sessions' });
      //Relacion con Service Creado
      this.raw.belongsTo(models.AdminModel.raw, { foreignKey: 'CreateByID', as: 'creator' });
      //Relacion con Service Editado
      this.belongsToMany(models.AdminModel.raw, { through: 'Modifications', foreignKey: 'ServiceID', as: 'modifierAdministrators' });
      //Relacion con Service Dado de baja
      this.belongsTo(models.AdminModel.raw, { foreignKey: 'DischargedID', as: 'administratorDischarge' });

  }

}


// // // Método de asociación, si necesitas relacionarlo con otros modelos
// // associate(models) {
// //   // Ejemplo de asociación, ajusta según las relaciones de tu proyecto
// //   this.raw.belongsTo(models.AnotherModel.raw, { foreignKey: 'anotherId' });
// // }

module.exports = new ServiceModel();