'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CalendarComponents.css';

const services = [
    {
        name: "Bronceado Orgánico",
        duration: 15, // Duración en minutos
        startHour: 11,
        endHour: 18,
    },
    {
        name: "Uñas Esculpidas",
        duration: 60, // Duración en minutos
        startHour: 10,
        endHour: 18,
    },
];

function CalendarComponent() {
    const [selectedService, setSelectedService] = useState(services[0]); // Servicio inicial
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        if (selectedDate && selectedService) {
            generateTimeSlots(selectedService.startHour, selectedService.endHour, selectedService.duration);
        }
    }, [selectedDate, selectedService]);

    const generateTimeSlots = (startHour, endHour, duration) => {
        const slots = [];
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += duration) {
                const formattedHour = hour < 10 ? `0${hour}` : hour;
                const formattedMinute = minute < 10 ? `0${minute}` : minute;
                slots.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        setTimeSlots(slots);
    };

    const handleServiceChange = (event) => {
        const selected = services.find(service => service.name === event.target.value);
        setSelectedService(selected);
        setSelectedDate(null); // Reinicia la selección de fecha y hora
        setSelectedTime(null);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleBooking = async () => {
        if (selectedDate && selectedTime) {
            const appointment = {
                service: selectedService.name,
                date: selectedDate.toISOString().split('T')[0], // Convertir a formato 'YYYY-MM-DD'
                time: selectedTime,
                client: {
                    email: "cliente@ejemplo.com" // TODO: Cambiar
                },
                state: "PENDING" // Estado inicial
            };

            try {
                const response = await fetch('/api/booking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ appointment }),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(`Cita reservada exitosamente: ${JSON.stringify(result.result)}`);
                } else {
                    const errorData = await response.json();
                    alert(`Error al reservar la cita: ${errorData.msg}`);
                }
            } catch (error) {
                alert(`Error del servidor: ${error.message}`);
            }
        }
    };

    return (
        <div className="calendar-container">
            {/* Botón "Volver" centrado */}
            <button className="back-button" onClick={() => window.history.back()}>
                Volver
            </button>

            {/* Header */}
            <header className="main-header">
                <h1>Reservar Servicio</h1>
            </header>

            {/* Contenido principal */}
            <main>
                <div className="service-selector">
                    <label htmlFor="service">Seleccionar servicio</label>
                    <select id="service" onChange={handleServiceChange} value={selectedService.name}>
                        {services.map((service, index) => (
                            <option key={index} value={service.name}>{service.name}</option>
                        ))}
                    </select>
                </div>

                <div className="date-selector">
                    <label>Seleccionar día</label>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        locale="es-ES"
                        minDate={new Date()}
                    />
                </div>

                {selectedDate && (
                    <div className="time-selector">
                        <label>Horarios disponibles para {selectedDate.toLocaleDateString('es-ES')}</label>
                        <div className="time-slots">
                            {timeSlots.map((time, index) => (
                                <button
                                    key={index}
                                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                    onClick={() => handleTimeClick(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTime && (
                    <div className="confirm-button-container">
                        {/* <button className="btn-book" onClick={handleBooking}>
                            Reservar
                        </button> */}
                        <a href="/bookConfirmed" className="btn-book">Reservar</a>
                    </div>
                )}
            </main>
        </div>


    );
}

export default CalendarComponent;
