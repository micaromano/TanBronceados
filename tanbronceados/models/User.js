//TODO: Cambiar a como esta en prolongation app ejemplo documentmodel

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  UserID: {
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
  Celular: DataTypes.STRING,
  Instagram: DataTypes.STRING,
  Rol: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['Cliente', 'Administrador']],
    },
  },
  FechaNacimiento: DataTypes.DATE,
  Genero: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['Femenino', 'Masculino', 'Otro']],
    },
  },
});

module.exports = User;

