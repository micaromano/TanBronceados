
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import models from '../../models/ModelsWrapper';
const db = require('../../config/db');
const globals = require('../../config/globals');
import { setTokenCookie } from './utils/auth';

const jwtSecret = globals.jwt_secret;

async function handler(req, res) {
  console.log('Received request:', { method: req.method, body: req.body });
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;
  console.log('Login attempt with:', { email });

  try {
    await db.authenticate();

    console.log(`Searching for client: ${email}`);
    const client = await models.clientModel.raw.findOne({ where: { Email: email } });

    if (!client) {
      console.error('client not found');
      return res.status(401).json({ error: 'Usuario y/o contraseña invalido' });
    }

    console.log('client found. Verifying password...');
    const isMatch = await bcrypt.compare(password, client.PasswordHash);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.error('Password does not match');
      return res.status(401).json({ error: 'Usuario y/o contraseña inválido' });
    }
    
    // Configura la cookie usando la función centralizada
    setTokenCookie(res, { id: client.ClientID, email: client.Email, fullName: client.FullName });

    // Enviar respuesta exitosa
    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}

export default handler;
