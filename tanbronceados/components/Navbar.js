"use client";

import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { handleLogout } from '../pages/api/utils/authLogout';


const Navbar = ({ isLoggedIn }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Marca el cliente como montado
  }, []);

  if (!mounted) {
    return null; // Evitar renderizado hasta que el cliente esté listo
  }
  

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
              <li><a href="#mis-sesiones">Mis Sesiones</a></li>
              <li><a href="#mis-reservas">Mis Reservas</a></li>
              <li><a href="/agendar">Agendar Cita</a></li>
            </>
          )}

          {/* Enlaces fijos visibles para todos */}
          <li><a href="#nosotras">Nosotras</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>

          {/* Botón de Login o Logout */}
          {isLoggedIn ? (
            <li><a className="button" onClick={() => handleLogout()}>Logout</a></li>
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
