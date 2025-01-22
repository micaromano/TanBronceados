const jwt = require('jsonwebtoken');
const { ClientModel } = require('../../../models/ClientModel'); // Modelo del cliente
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

    // Busca al usuario en la base de datos
    const [results, metadata] = await db.query(
      'SELECT * FROM Clients WHERE Email = :email',
      {
        replacements: { email: email },
        type: db.QueryTypes.SELECT,
      }
    );

    const cliente = results;

    if (!cliente) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Activa la cuenta del usuario
    const result = await db.query(
      `UPDATE Clients SET isActive = :newValue WHERE Email = :email`,
      {
        replacements: { newValue: true, email },
        type: db.QueryTypes.UPDATE,
      }
    );

    //res.send('Cuenta confirmada con exito. Ahora puedes iniciar sesion.');
    res.redirect('/confirmAccountSuccess');

  } catch (error) {
    console.error(error);
    res.status(400).send('Enlace de confirmación inválido o expirado.');
  }
};

module.exports = handler;