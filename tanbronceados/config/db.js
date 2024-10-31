
const { Sequelize } = require('sequelize')
const globals  = require('./globals'); // Importa la librería dotenv para poder acceder a las variables de entorno

const sequelize = new Sequelize(globals.db_name, globals.db_user, globals.db_password, { // Crea una nueva instancia de Sequelize con las credenciales de la base de datos
  host: globals.db_host,
  dialect: 'mysql',
});


module.exports = sequelize;
//crear una base de datos vacia para qie el cree las tablas