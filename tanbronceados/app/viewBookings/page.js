'use client';

import { useState, useEffect } from 'react';
import { useRouter} from 'next/navigation';
import {toast} from 'react-toastify';

function ViewBookings() {
    const [bookings, setBookings] = useState([]);
    const [filters, setFilters] = useState({ client: '', date: '', state: ''});
    const [ isLoading, setIsLoading] = useState(false);
    const [bookingStates, setBookingStates] = useState([]);

    useEffect(() => {
      fetchBookingStates();
    }, []);

    const fetchBookingStates = async () => {
      try {
        const res = await fetch('/api/getBookingStates'); // Endpoint para obtener los estados
        if (res.ok) {
          const data = await res.json();
          setBookingStates(data.states);
        } else {
          toast.error('Error al cargar los estados de reservas');
        }
      } catch (error) {
        console.error('Error al obtener los estados de reservas:', error);
      }
    };

      // Manejar cambios en los filtros
    const handleFilterChange = (e, field) => {
      setFilters({
        ...filters,
        [field]: e.target.value,
      });
    };

      // Obtener reservas filtradas desde la API
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        let url = '/api/getBookingsByFilter?';
        if (filters.client) url += `clientID=${filters.client}&`;
        if (filters.date) url += `BookingDate=${filters.date}&`;
        if (filters.state) url += `BookingState=${filters.state}&`;

        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();
          setBookings(data.bookings);
        } else {
          toast.error('Error al cargar las reservas');
        }
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Cambiar estado de asistencia: CORREGIR
  const updateAttendanceStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setBookings((prevReservations) =>
          prevReservations.map((reservation) =>
            bookings.BookingID === id ? { ...reservation, status: newStatus } : reservation
          )
        );
        toast.success('Estado actualizado correctamente');
      } else {
        toast.error('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  // Renderizado
  return (
    <div>
      <h1>Visualización del Calendario de Reservas</h1>

      <div>
        <h2>Filtros</h2>
        <input
          type="text"
          placeholder="Cliente"
          value={filters.client}
          onChange={(e) => handleFilterChange(e, 'client')}
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange(e, 'date')}
        />
        <select value={filters.state} onChange={(e) => handleFilterChange(e, 'state')}>
          <option value="">Todos los estados</option>
          {bookingStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <button onClick={fetchBookings}>Ver Reservas</button>
      </div>

      <div>
        <h2>Reservas</h2>
        {isLoading ? (
          <p>Cargando reservas...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.BookingID}>
                  <td>{booking.ClientID}</td>
                  <td>{booking.BookingDate}</td>
                  <td>{booking.BookingTime}</td>
                  <td>{booking.BookingState === 'attended' ? 'Asistió' : 'No asistió'}</td>
                  <td>
                    <button onClick={() => updateAttendanceStatus(reservation.id, 'attended')}>
                      Marcar como Asistió
                    </button>
                    <button onClick={() => updateAttendanceStatus(reservation.id, 'not_attended')}>
                      Marcar como No Asistió
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewBookings;


  