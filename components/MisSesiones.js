import React from "react";
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function MisSesiones({ user }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stickers, setStickers] = useState(Array(7).fill(null)); // Inicializar con 7 celdas vacías
  const [stickerCount, setStickerCount] = useState(0); // Contador de stickers acumulados

  useEffect(() => {
    cargarStickers([]);
    fetch(`/api/getSessionsByClient?id=${user.id}`, { credentials: 'include' })
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
  }, [user.id]);

  console.log(sessions)
  

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
    
    // Descomentar si se quieren simular sesiones
    newStickers[0] = `Sticker #1`;
    
    // Actualizar estados
    setStickers(newStickers);
    setStickerCount(newStickerCount);
  }
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
          <div className="features sessions-table">
            {/* Encabezado de la tabla */}
            <div className="table-header">
              <div className="session-cell"><strong>Sesión Id</strong></div>
              <div className="session-cell"><strong>Fecha de Compra</strong></div>
              <div className="session-cell"><strong>Estado</strong></div>
              <div className="session-cell"></div>
            </div>
            {/* Filas de la tabla */}
            {sessions.map((session) => (
              <div key={session.SessionID} className="table-row">
                <div className="session-cell">{session.SessionID}</div>
                <div className="session-cell">
                  {new Date(session.SessionPurchaseDate).toLocaleDateString()}
                </div>
                <div className="session-cell">
                  {session.SessionState}
                </div>
                <div className="session-cell">
                  <button
                    className="session-button"
                    onClick={() => agendarSesion(session.SessionID)}
                    >
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
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