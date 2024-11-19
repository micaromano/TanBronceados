const jwt = require('jsonwebtoken');
const { ClientModel } = require('../../../models/ClientModel'); // Modelo del cliente
const db = require('../../../config/db');
const globals = require('../../../config/globals');

const jwtSecret = globals.jwt_secret;

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  //router.get('/confirmar-cuenta/:token', async (req, res) => {
  const { token } = req.query;
  //const secretKey = 'mi_clave_secreta'; // Usa la misma clave que al generar el token

  try {
    // Verifica el token
    const decoded = jwt.verify(token, jwtSecret);
    //const userId = decoded.id;
    const email = decoded.email;

    console.log('email', email);

    // // Busca al usuario en la base de datos
    // //const cliente = await ClientModel.findByPk(userId);
    // const cliente = await ClientModel.raw.findOne({ where: { Email: email } });

    const [results, metadata] = await db.query(
      'SELECT * FROM Clients WHERE Email = :email',
      {
        replacements: { email: email },
        type: db.QueryTypes.SELECT,
      }
    );
    console.log(results);

    const cliente = results;

    if (!cliente) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Activa la cuenta del usuario
    //cliente.isActive = true; // Cambia este campo según tu esquema

    const result = await db.query(
      `UPDATE Clients SET isActive = :newValue WHERE Email = :email`,
      {
        replacements: { newValue: true, email },
        type: db.QueryTypes.UPDATE,
      }
    );

    //await cliente.save();

    res.send('Cuenta confirmada con exito. Ahora puedes iniciar sesion.');

  } catch (error) {
    console.error(error);
    res.status(400).send('Enlace de confirmación inválido o expirado.');
  }
};

module.exports = handler;