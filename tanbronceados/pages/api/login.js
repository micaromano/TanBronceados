
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ClientModel = require('../../models/ClientModel'); // Asegúrate de que la ruta es correcta
const db = require('../../config/db');
const globals = require('../../config/globals');
const cookie = require('cookie'); // Para manejar las cookies en la respuesta

const jwtSecret = globals.jwt_secret;

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    await db.authenticate();

    console.log(`Searching for client: ${email}`);
    const client = await ClientModel.raw.findOne({ where: { Email: email } });

    if (!client) {
      console.error('client not found');
      return res.status(401).json({ error: 'Usuario y/o contraseña invalido' });
    }

    console.log('client found. Verifying password...');
    const isMatch = await bcrypt.compare(password, client.PasswordHash);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      const token = jwt.sign({ email: client.Email }, jwtSecret, { expiresIn: '1h' });
      console.log('Token created successfully.');

      // Configurar la cookie para almacenar el token
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 hora
        sameSite: 'strict',
        path: '/'
    }));

      // Enviar respuesta exitosa sin token en el body
      return res.status(200).json({ message: 'Login successful' });
    } else {
      console.error('Password does not match');
      return res.status(401).json({ error: '' });
    }

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}

module.exports = handler;
