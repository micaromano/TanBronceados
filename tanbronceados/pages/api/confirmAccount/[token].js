const jwt = require('jsonwebtoken');
const { ClientModel } = require('../../../models/ClientModel'); // Modelo del cliente
const globals = require('../../../config/globals');

const jwtSecret = globals.jwt_secret;

async function handler(req, res) {l
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

    // if (!cliente) {
    //   return res.status(404).send('Usuario no encontrado');
    // }

    // // Activa la cuenta del usuario
    // cliente.isActive = true; // Cambia este campo según tu esquema
    // await cliente.save();

    res.send('Cuenta confirmada con exito. Ahora puedes iniciar sesion.');
    
  } catch (error) {
    console.error(error);
    res.status(400).send('Enlace de confirmación inválido o expirado.');
  }
};

module.exports = handler;