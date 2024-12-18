import React from "react";
import { useState, useEffect } from 'react';

export default function MisSesiones({ user }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stickers, setStickers] = useState(Array(7).fill(null)); // Inicializar con 7 celdas vacías

  useEffect(() => {

    fetch(`/api/sessionsByClient/${user.email}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
        cargarStickers(data); // Cargar stickers según las compras
      })
      .catch((error) => {
        console.error('Error al obtener sesiones:', error);
        setLoading(false);
      });
  }, []);

  // Función para cargar los stickers según las compras realizadas
  const cargarStickers = (sessions) => {
    const newStickers = [...stickers];
    sessions.slice(0, 7).forEach((session, index) => {
      newStickers[index] = `Sticker #${session.SessionID}`; // Simula un sticker por compra
    });
    setStickers(newStickers);
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

        {/* Tabla de Stickers */}
        <div className="stickers-container">
          <h3>Stickers Acumulados</h3>
          <table>
            <tbody>
              <tr>
                {stickers.map((sticker, index) => (
                  <td key={index}>
                  <img
                    src="/images/logoNegro.jpg" // Ruta del logo
                    alt="Logo"
                    className={sticker ? "active" : ""}
                  />
                </td>
              ))}
            </tr>
            </tbody>
          </table>
        </div>

      </section>
    </div>
  );
}