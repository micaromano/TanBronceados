import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const globals = require('../../../config/globals');

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: globals.google_OAuth_Client_Id,
      clientSecret: globals.google_OAuth_Client_Secret,
    }),
  ],
  secret: globals.nextauth_Secret, // Agrega un secreto seguro
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
