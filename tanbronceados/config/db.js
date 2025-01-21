const {Sequelize} = require('sequelize');
const globals = require('./globals');

console.log('db_name-------', globals.db_name);
const sequelize = new Sequelize(globals.db_name, globals.db_user, globals.db_password, {
  host: globals.db_host,
  dialect: 'mssql',
  timezone: '-03:00', // UTC
  port: globals.db_port,
  dialectOptions: {
    useUTC: false,
    dateStrings: true, // Recupera las fechas como cadenas
    options: {
      encrypt: true, // Para usar autenticación de SQL Server
    },
  },
});

module.exports = sequelize;
