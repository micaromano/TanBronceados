'use client';
import '../../styles/CalendarComponents.css';

import React, { useState, useEffect } from 'react';
import ServiceSelector from '../../components/ServiceSelector';
import DateSelector from '../../components/DateSelector';
import TimeSlotSelector from '../../components/TimeSlotSelector';
import { fetchServices, bookAppointment } from '../../services/BookingService';

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

  const generateTimeSlots = (startHour, endHour, duration) => {
    const slots = [];
  
    const startInMinutes = startHour * 60;
    const endInMinutes = endHour * 60;
  
    for (let current = startInMinutes; current < endInMinutes; current += duration) {
      const hour = Math.floor(current / 60);
      const minute = current % 60;
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;

      slots.push(formattedTime);
    }
    setTimeSlots(slots);
  };

  useEffect(() => {
    if (selectedDate && selectedService) {
      generateTimeSlots(9, 18, selectedService.Duration); //TODO: cambiar harcodeo, Aca me va a llegar desde Servicio model la hora desde y hasta 
    }
  }, [selectedDate, selectedService]);

// // Llamada a la API para guardar la reserva
//     const bookAppointment = async (appointmentData) => {
//     try {
//       const response = await fetch('/api/bookAppointment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(appointmentData),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data?.error || 'Error al procesar la reserva');
//       }
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   async function handleBooking() {
//         try {
//         // Formatear la fecha en "YYYY-MM-DD"
//         const formattedDate = selectedDate
//             ? selectedDate.toISOString().split('T')[0] // Convierte el objeto Date al formato "YYYY-MM-DD"
//             : null;
    
//         // Asegúrate de que `selectedTime` esté en el formato "HH:mm" (ejemplo: "09:00").
//         // Si ya está en este formato por la lógica de tus "time slots", puedes dejarlo como está.
    
//         const requestBody = {
//             Date: formattedDate, //TODO: No le voy a tener que pasar date y time por separado,
//                                 //ahora esta solo DateTime que lo tengo que unir con esta funcion
//                                 //new Date(${fechaDesde}T${horarioDesde});
//             Time: selectedTime,  //TODO: esto se va
//             State: 'Pendiente',         // Booleano para el estado
//             ClientID: clientId,  // ID del cliente
//             SessionID: sessionId //TODO: cambiar a que sea servicio
//         };
    
//         const response = await fetch('/api/bookAppointment', {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody), // Envía los datos formateados correctamente
//         });
    
//         const data = await response.json();
    
//         if (!response.ok) {
//             throw new Error(data.error || 'Error al crear la reserva');
//         }
    
//         alert('Reserva creada con éxito. ID: ' + data.data.BookingID);
//         } catch (error) {
//         console.error('Error al reservar:', error);
//         alert('No se pudo crear la reserva');
//         }

//     };

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
      // const bookingDateTimeString = bookingDateTime.toISOString();

      // 2. Construir el cuerpo (coincidir con tu nuevo modelo)
      const requestBody = {
        BookingDateTime: bookingDateTime, // o .toISOString() si tu endpoint lo parsea
        BookingType: 'ReservaPedientePago', //TODO: Ajusta según tu lógica
        BookingState: 'Pendiente',
        ClientID: clientId,
        SessionID: sessionId,
        ServiceID: selectedService.ServiceID
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