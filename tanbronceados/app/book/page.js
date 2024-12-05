'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CalendarComponents.css';

function CalendarComponent({ availableTimes, selectedService, onChangeService, startHour = 11, endHour = 18 }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        if (selectedDate && startHour !== undefined && endHour !== undefined) {
            generateTimeSlots(startHour, endHour);
        }
    }, [selectedDate, startHour, endHour]);

    const generateTimeSlots = (startHour, endHour) => {
        const intervalMinutes = 15;
        const slots = [];

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const formattedHour = hour < 10 ? `0${hour}` : hour;
                const formattedMinute = minute < 10 ? `0${minute}` : minute;
                slots.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        setTimeSlots(slots);
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
                date: selectedDate.toISOString().split('T')[0], // Convertir a formato 'YYYY-MM-DD'
                time: selectedTime,
                client: {
                    email: "cliente@ejemplo.com" // Aquí debes poner el email del cliente, esto puede cambiar según tu aplicación
                },
                state: "PENDING" // Estado inicial de la reserva
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
            <header className="calendar-header">
                <h1>Tan Bronceado</h1>
                <div className="selected-service">
                    <span>Servicio seleccionado: {selectedService}</span>
                    <button onClick={onChangeService}>Cambiar</button>
                </div>
            </header>

            <div className="date-selector">
                <h3>Seleccionar día:</h3>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    locale="es-ES"
                    minDate={new Date()}
                />
            </div>

            {selectedDate && (
                <div className="time-selector">
                    <h3>Horarios disponibles para {selectedDate.toLocaleDateString('es-ES')}</h3>
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
                    <button className="confirm-button" onClick={handleBooking}>Reservar</button>
                </div>
            )}
        </div>
    );
}

export default CalendarComponent;
