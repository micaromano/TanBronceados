export const metadata = {
  title: "Tan Bronceados - Web Page",
  description: "Página web de Tan Bronceados",
};

import localFont from "next/font/local";
import "../styles/globals.css";
import ClientProvider from "./clienteProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
