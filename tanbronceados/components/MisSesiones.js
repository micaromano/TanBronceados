import React from "react";
import { useState, useEffect } from 'react';

export default function MisSesiones() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener el ID del cliente desde el token o sesión activa
    const clientId = getClientIdFromToken(); // TODO Implementar esta función para extraer el ID del cliente

    fetch(`/api/sessionsByClient/${clientId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener sesiones:', error);
        setLoading(false);
      });
  }, []);

  const getClientIdFromToken = () => {
    // TDDO Implementar la lógica para obtener el ClientID desde el token o sesión
    return '1'; // ID de prueba
  };

  return (
    <div id="mis-sesiones" className="container">
      <section className="box special">
        <header className="major">
          <h2>Mis Sesiones Compradas</h2>
          <p>
            Aquí puedes consultar y gestionar las sesiones que has adquirido.
          </p>
        </header>
        {loading ? (
          <p>Cargando tus sesiones...</p>
        ) : sessions.length > 0 ? (
          <ul className="features">
            {sessions.map((session) => (
              <li key={session.SessionID} className="feature">
                <span className="icon solid major fa-calendar-check accent2"></span>
                <h3>Sesión #{session.SessionID}</h3>
                <p>
                  Fecha de compra:{" "}
                  {new Date(session.SessionPurchaseDate).toLocaleDateString()}
                </p>
                <p>Precio: {session.Price} UYU</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes sesiones compradas.</p>
        )}
      </section>
    </div>
  );
}