import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User';  // Importa el modelo de usuario
import db from '../../config/db';      // Importa la configuración de la base de datos

const jwtSecret = process.env.JWT_SECRET;

export default async function handler(req, res) {
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

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.passwordHash);
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
