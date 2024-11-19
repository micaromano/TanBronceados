
require('dotenv').config();

console.log('Loaded environment variables:', process.env); // <-- Agrega esta línea temporalmente para depurar

module.exports = {
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    jwt_secret: process.env.JWT_SECRET,
    site_key: process.env.SITE_KEY,
    secret_key: process.env.SECRET_KEY,
    email_user: process.env.EMAIL_USER,
    pass_user: process.env.PASS_USER,
};

// todo lugar donde necesite usar la base de datos debo hacer un require de config/globals.js
