import React from 'react';

const Banner = ({ isLoggedIn }) => {
  return (
    <section id="banner" className="banner">
      {/*TODO falta agregar el nombre del cliente logueado*/ }
      <h2>{isLoggedIn ? `Bienvenido` : "TAN Bronceados"}</h2> 
      {!isLoggedIn && <p>Bronceado Orgánico</p>}
      <ul className="actions special">
        {isLoggedIn ? (
          <>
            <li><a href="/compraSesiones" className="button primary">Comprar Sesiones</a></li>
            <li><a href="/agendar" className="button">Agendar Cita</a></li>
          </>
        ) : (
          <>
            <li><a href="/register" className="button primary">Registrarse</a></li>
            <li><a href="/login" className="button">Obtener Sesiones</a></li>
          </>
        )}
      </ul>
      
    </section>
  );
};

export default Banner;