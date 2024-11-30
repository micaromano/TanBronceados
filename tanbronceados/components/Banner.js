import React from 'react';

const Banner = () => {
  return (
    <section id="banner" className="banner">
      <h2>TAN Bronceados</h2>
      <p>Bronceado Orgánico</p>
      <ul className="actions special">
        <li><a href="/register" className="button primary">Registrarse</a></li>
        <li><a href="/login" className="button">Obtener Sesiones</a></li>
      </ul>
    </section>
  );
};

export default Banner;