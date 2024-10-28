import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const adminUsername = process.env.ADMIN_USERNAME;
const adminPasswordHash = '$2b$10$6Trw.ICZnSpXRCEx7arwJump0vq316j/LJ05CC9H5hSIaevrAphfC'; // Inserta el hash aquí directamente
const jwtSecret = process.env.JWT_SECRET;

console.log('Password hash in use:', adminPasswordHash); // Verificar que se carga correctamente

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  // Logs para depuración
  console.log('Received username:', username);
  console.log('Expected username:', adminUsername);
  console.log('Password hash in use:', adminPasswordHash);
  console.log('Received password:', password);

  // Verificación de username
  if (username !== adminUsername) {
    console.error('Username does not match');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Comparación de la contraseña directamente con el hash en claro
  try {
    const isMatch = await bcrypt.compare(password, adminPasswordHash);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      console.error('Password does not match');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during password comparison:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
