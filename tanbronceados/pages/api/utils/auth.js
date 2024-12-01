import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const jwtSecret = process.env.JWT_SECRET;

export function setTokenCookie(res, user) {
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: '1h',
  });

  console.log('Token generado:', token);
  
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hora
      sameSite: 'strict',
      path: '/',
    })
  );
}

