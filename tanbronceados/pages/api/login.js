//TODO: cambiar imports por requires

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User';  // Importa el modelo de usuario
import db from '../../config/db';      // Importa la configuración de la base de datos

const globals  = require('../../config/globals')

const jwtSecret = globals.jwt_secret;

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  try {
    // Conecta a la base de datos si aún no está conectada
    await db.authenticate();

    // Busca el usuario en la base de datos
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verifica la contraseña TODO: compare tiene encuenta los ataques de tiempo
    const isMatch = await bcrypt.compare(password, user.passwordHash); //busco el hash con la bd y con el hash que acabo de hacer que puso la persona
    console.log('Password match result:', isMatch);

    if (isMatch) {
      // Crea un token JWT
      const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      console.error('Password does not match');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
module.exports = handler;
