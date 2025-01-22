const jwt = require('jsonwebtoken');
const ClientModel = require('../../../models/ClientModel'); // Modelo del cliente
const db = require('../../../config/db');
const globals = require('../../../config/globals');

const jwtSecret = globals.jwt_secret;

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token } = req.query;

  try {
    // Verifica el token
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;

    console.log('decoded', decoded);
    console.log('email', email);

    // Se busca el cliente que se quiere dar de alta
    const client = await ClientModel.raw.findOne({ where: { Email: email } });
    console.log('client', client);

    //const cliente = results;

    if (!client) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Activa la cuenta del cliente
    const result = await ClientModel.raw.update(
      { isActive: true }, // Cambiar estado a activado
      { where: { Email: email } } // Condición para encontrar el cliente
      );

    //res.send('Cuenta confirmada con exito. Ahora puedes iniciar sesion.');
    res.redirect('/confirmAccountSuccess');

  } catch (error) {
    console.error(error);
    res.status(400).send('Enlace de confirmación inválido o expirado.');
  }
};

module.exports = handler;