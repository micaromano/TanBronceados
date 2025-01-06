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

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
        setSelectedService(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    loadServices();
  }, []);

  const generateTimeSlots = (startHour, endHour, duration) => {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(formattedTime);
      }
    }
    setTimeSlots(slots);
  };

  useEffect(() => {
    if (selectedDate && selectedService) {
      generateTimeSlots(9, 18, selectedService.Duration);
    }
  }, [selectedDate, selectedService]);

  const handleBooking = async () => {
    if (selectedDate && selectedTime) {
      const appointment = {
        service: selectedService.ServiceName,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        client: { email: 'cliente@ejemplo.com' },
        state: 'PENDING',
      };

      try {
        await bookAppointment(appointment);
        alert('Reserva exitosa');
      } catch (error) {
        alert('Error al reservar');
      }
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