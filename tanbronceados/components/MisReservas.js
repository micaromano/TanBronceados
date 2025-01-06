import React from "react";
import { useState, useEffect } from 'react';

export default function MisReservas() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener el ID del cliente desde el token o sesión activa
    const clientId = getClientIdFromToken(); // TODO Implementar esta función para extraer el ID del cliente

    fetch(`/api/bookingsByClient/${clientId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener reservas:', error);
        setLoading(false);
      });
  }, []);

  const getClientIdFromToken = () => {
    // TDDO Implementar la lógica para obtener el ClientID desde el token o sesión
    return '1'; // ID de prueba
  };

  return (
    <div id="mis-reservas" className="container">
      <section className="box special">
        <header className="major">
          <h2>Mis Citas Agendadas</h2>
          <p>
            Aquí puedes consultar y gestionar las citas que has agendado.
          </p>
        </header>
        {loading ? (
          <p>Cargando tus reservas...</p>
        ) : bookings.length > 0 ? (
          <ul className="features">
            {bookings.map((booking) => (
              <li key={booking.BookingID} className="feature">
                <span className="icon solid major fa-calendar-check accent2"></span>
                <h3>Reserva #{booking.BookingID}</h3>
                <p>
                  Fecha de compra:{" "}
                  {new Date(booking.SessionPurchaseDate).toLocaleDateString()} //TODO: ver si agarra bien esto
                </p>
                <p>Precio: {booking.State} UYU</p>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>No tienes sesiones compradas.</p>
          </>
        )}
      </section>
    </div>
  );
}