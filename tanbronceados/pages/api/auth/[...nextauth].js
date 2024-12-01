import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const globals = require('../../../config/globals');
import { setTokenCookie } from '../utils/auth.js';


export default async function authHandler(req, res) {
  // Guarda el contexto de respuesta en `global`
  global.res = res;

  // Maneja NextAuth
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: globals.google_OAuth_Client_Id,
        clientSecret: globals.google_OAuth_Client_Secret,
      }),
    ],
    secret: globals.nextauth_Secret, // Agrega un secreto seguro
    callbacks: {
      async jwt({ token, user, profile }) {
        if (user) {
          token.id = user.id || profile?.sub; // Usa el id de Google (sub) si está disponible
          token.email = user.email;
        }
        return token;
      },
      async session({ session, token }) {
        // Agrega el id del token a la sesión del usuario
        session.user.id = token.id;
        return session;
      },
    },
    events: {
      async signIn({ user, profile }) {
        console.log('Evento signIn activado:', { user, profile }); // Verifica que `signIn` se ejecuta
        
        console.log('Credenciales:', global.res); // Verifica que `signIn` se ejecuta

        setTokenCookie(global.res, {
          id: user.id || profile?.sub, // ID del usuario o de Google
          email: user.email,
        });
      },
    },
  });
}