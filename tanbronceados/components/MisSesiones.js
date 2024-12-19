import React from "react";
import { useState, useEffect } from 'react';

export default function MisSesiones({ user }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stickers, setStickers] = useState(Array(7).fill(null)); // Inicializar con 7 celdas vacías
  const [stickerCount, setStickerCount] = useState(0); // Contador de stickers acumulados

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
  }, [user.email]);

  // Cargar stickers y manejar la lógica de sesión gratis
  const cargarStickers = (sessions) => {
    let newStickers = [...stickers];
    let newStickerCount = stickerCount;

    // Asignar stickers a partir de sesiones pagas
    sessions.forEach((session) => {
      if (newStickerCount < 7) {
        const stickerIndex = newStickerCount; // Posición actual del sticker
        newStickers[stickerIndex] = `Sticker #${session.SessionID}`;
        newStickerCount++;
      }
    });

    // Verificar si se alcanzaron 7 stickers
    if (newStickerCount >= 7) {
      generarSesionGratis();
      newStickerCount = 0; // Resetear el contador
      newStickers = Array(7).fill(null); // Reiniciar stickers
    }

    // Actualizar estados
    setStickers(newStickers);
    setStickerCount(newStickerCount);

    // Generar sesión gratis
  const generarSesionGratis = () => {
    alert("¡Felicitaciones! Has acumulado 7 stickers y ganaste una sesión gratis.");

    // TODO lógica para enviar la sesión gratis en el backend
    fetch(`/api/generarSesionGratis/${user.email}`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Sesión gratis generada:", data);
      })
      .catch((error) => console.error("Error al generar sesión gratis:", error));
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
                    alt="Sticker"
                    className={sticker ? "active" : ""}
                  />
                </td>
              ))}
            </tr>
            </tbody>
          </table>
          <p>Stickers acumulados: {stickerCount} / 7</p>
        </div>
      </section>
    </div>
  );
}
}