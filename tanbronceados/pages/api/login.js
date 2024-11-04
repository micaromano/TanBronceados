const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AdminModel = require('../../models/AdminModel'); // Asegúrate de que la ruta es correcta
const db = require('../../config/db');
const globals = require('../../config/globals');

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
    // Cambiar admin.findOne a AdminModel.raw.findOne
    const admin = await AdminModel.raw.findOne({ where: { Username: username } });

    if (!admin) {
      console.error('admin not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('admin found. Verifying password...');
    const isMatch = await bcrypt.compare(password, admin.PasswordHash);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      const token = jwt.sign({ username: admin.Username }, jwtSecret, { expiresIn: '1h' });
      console.log('Token created successfully.');
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
