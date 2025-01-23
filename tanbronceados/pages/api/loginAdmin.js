
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../../models/ModelsWrapper'); // Asegúrate de que la ruta es correcta
const db = require('../../config/db');
const globals = require('../../config/globals');
const cookie = require('cookie'); // Para manejar las cookies en la respuesta

const jwtSecret = globals.jwt_secret;

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  try {
    console.log('Connecting to database...------------------------------------------------------------------------');
    await db.authenticate();
    console.log('Database connected.------------------------------------------------------------------------');

    console.log(`Searching for admin: ${username}`);
    console.log(`Searching for admin: ${password}`);
    // Cambiar admin.findOne a AdminModel.raw.findOne
    const admin = await models.adminModel.raw.findOne({ where: { Username: username } });

    if (!admin) {
      console.error('admin not found');
      return res.status(401).json({ error: 'Usuario y/o contraseña invalido' });
    }

    console.log('admin found. Verifying password...');
    const isMatch = await bcrypt.compare(password, admin.PasswordHash);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      const token = jwt.sign({ username: admin.Username }, jwtSecret, { expiresIn: '1h' });
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
