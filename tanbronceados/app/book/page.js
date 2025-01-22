'use client';
import '../../styles/CalendarComponents.css';

import React, { useState, useEffect } from 'react';
import ServiceSelector from '../../components/ServiceSelector';
import DateSelector from '../../components/DateSelector';
import TimeSlotSelector from '../../components/TimeSlotSelector';
import { 
  fetchServices, 
  bookAppointment, 
  fetchBookedSlots 
} from '../../services/BookingService';

function BookingPage() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);

    // Agregados
    const [clientId, setClientId] = useState(1);
    const [sessionId, setSessionId] = useState(2);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        const activeServices = data.filter((s) => s.isActive === true);
  
        setServices(activeServices);
        setSelectedService(activeServices[0]);
      } catch (error) {
        console.error(error);
      }
    };
    loadServices();
  }, []);

// 2. Cargar los time slots disponibles cada vez que cambie la fecha o el servicio
useEffect(() => {
  async function loadTimeSlots() {
    if (!selectedDate || !selectedService) {
      setTimeSlots([]);
      return;
    }

    // Generar primero todos los time slots (en base a HoraDesde, HoraHasta, Duration)
    const allSlots = [];
    const startInMinutes = selectedService.HoraDesde * 60;
    const endInMinutes = selectedService.HoraHasta * 60;

    for (let current = startInMinutes; current <= endInMinutes; current += selectedService.Duration) {
      const hour = Math.floor(current / 60);
      const minute = current % 60;
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      allSlots.push(formattedTime);
    }

    // Llamar a la API para saber cuáles están ocupados
    const dateString = selectedDate.toISOString().split('T')[0];
    const bookedSlots = await fetchBookedSlots(selectedService.ServiceID, dateString);

    // Filtrar los ocupados
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    setTimeSlots(availableSlots);
  }

  loadTimeSlots();
}, [selectedDate, selectedService]);

 //TODO: REVISAR NUEVA FUNCIÓN: Llamar a /api/bookAppointment
  const handleBooking = async () => {
    try {
      if (!selectedDate || !selectedTime || !selectedService) {
        alert('Completa todos los datos antes de reservar');
        return;
      }

      // 1. Unificar fecha y hora en un DateTime
      //    Ejemplo: "2025-01-20T09:00:00"
      const dateString = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const bookingDateTime = new Date(`${dateString}T${selectedTime}:00`); 
      // Si tu BD entiende la ISO string, puedes hacer:

      // 2. Construir el cuerpo (coincidir con tu nuevo modelo)
      const requestBody = {
        BookingDateTime: bookingDateTime, // o .toISOString() si tu endpoint lo parsea
        BookingType: 'ReservaPendientePago', //TODO: Ajusta según tu lógica
        BookingState: 'Pendiente',
        clientID: clientId,
        sessionID: sessionId,
        serviceID: selectedService.ServiceID
      };

      // 3. Hacer la llamada
      const response = await fetch('/api/bookAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la reserva');
      }

      alert('Reserva creada con éxito. ID: ' + data.data.BookingID);
      setSelectedTime(null);
    } catch (error) {
      console.error('Error al reservar:', error);
      alert('No se pudo crear la reserva');
    }
  };

  return (
    <div className="calendar-container">
      <ServiceSelector
        services={services}
        selectedService={selectedService}
        onChange={(e) =>
          setSelectedService(services.find((s) => s.ServiceName === e.target.value))
        }
      />
      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
      {selectedDate && (
        <TimeSlotSelector
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          onTimeClick={setSelectedTime}
        />
      )}
      {selectedTime && (
        <button className="btn-book" onClick={handleBooking}>
          Reservar
        </button>
      )}
    </div>
  );
}

export default BookingPage;