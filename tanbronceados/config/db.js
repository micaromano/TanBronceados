// (configuración de Sequelize)
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { // Crea una nueva instancia de Sequelize con las credenciales de la base de datos
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;
