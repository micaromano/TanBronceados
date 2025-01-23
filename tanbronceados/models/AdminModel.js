const { DataTypes } = require('sequelize');

class AdminModel {
  #rawModel;
  #db;
  constructor(db) {
    this.#db = db;
    this.#initModel();
    Object.freeze(this);
  }

  #initModel() {
    this.#rawModel = this.#db.define('Admin', {
      AdminID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Username: {
        type: DataTypes.STRING,
        unique: true,
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
    }, {
      tableName: 'Admins',  // Nombre de la tabla
      timestamps: true,  // Activa las columnas createdAt y updatedAt
      freezeTableName: true,
    });
  }

  get raw() {
    return this.#rawModel;
  }

  associate(models) {
    // Relacion con Service Creado
    this.hasMany(models.ServiceModel.raw, { as: 'CreatedServices', foreignKey: 'CreateByID' });
    // Relacion con Service Editado
    this.belongsToMany(models.ServiceModel.raw, { through: 'Modifications', as: 'ModifiedServices', foreignKey: 'AdminID' });
    // Relacion con Service Dado de baja
    this.hasMany(models.ServiceModel.raw, { as: 'ServicesTerminated', foreignKey: 'DischargedID' });
  }

}

module.exports = AdminModel;


//   // Método de asociación, si necesitas relacionarlo con otros modelos
//   associate(models) {
//     // Ejemplo de asociación, ajusta según las relaciones de tu proyecto
//     // this.raw.belongsTo(models.AnotherModel.raw, { foreignKey: 'anotherId' });
//   }
// }