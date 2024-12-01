"use client";

import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { usePathname } from 'next/navigation'; // Importa usePathname de next/navigation

const Navbar = ({ isLoggedIn }) => {
  const pathname = usePathname(); // Obtén la ruta actual

  return (
    <header id="header" className="alt" style={{ backgroundColor: '#795D4F' }}>
      <h1>
        <a href="/">TAN Bronceados</a>
      </h1>
      <nav id="nav">
        <ul>
          {/* Enlaces dinámicos a la izquierda si está logueado */}
          {isLoggedIn && (
            <>
              <li><a href="/misSesiones">Mis Sesiones</a></li>
              <li><a href="/reservas">Reservas</a></li>
            </>
          )}

          {/* Enlaces fijos visibles para todos */}
          <li><a href="#nosotras">Nosotras</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>

          {/* Botón de Login o Logout */}
          {isLoggedIn ? (
            <li><a href="/logout" className="button">Logout</a></li>
          ) : (
            <>
              <li><a href="/register">Registrarse</a></li>
              <li><a href="/loginAdmin">Acceso Admin</a></li>
              <li><a href="/login" className="button">Login</a></li>
            </>
          )}
          
          
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
