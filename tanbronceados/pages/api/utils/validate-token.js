import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Leer cookies desde el encabezado
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies.token; // Obtén el token de las cookies

    if (!token) {
      return res.status(401).json({ isLoggedIn: false, message: 'No se encontró el token' });
    }

    try {
      // Verificar el token usando el secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({ isLoggedIn: true, user: decoded });
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return res.status(401).json({ isLoggedIn: false, message: 'Token inválido' });
    }
  } else {
    // Responder con un error si el método no es GET
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
