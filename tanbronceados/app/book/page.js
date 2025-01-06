'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CalendarComponents.css';

function CalendarComponent() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);

    // TODO: Cambiar el horario hardcodeado, aca se va a poner la info que de lo de horas habilitadas
    const startHour = 9;
    const endHour = 18;

    // Fetch services from the backend
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/getServicesList');
                if (response.ok) {
                    const data = await response.json();
                    setServices(data);
                    setSelectedService(data[0]);
                } else {
                    console.error('Error fetching services:', await response.text());
                }
            } catch (error) {
                console.error('Server error:', error);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        if (selectedDate && selectedService) {
            generateTimeSlots(startHour, endHour, selectedService.Duration);
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
        const selected = services.find(
            (service) => service.ServiceName === event.target.value
        );
        setSelectedService(selected);
        setSelectedDate(null);
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
                service: selectedService.ServiceName,
                date: selectedDate.toISOString().split('T')[0],
                time: selectedTime,
                client: {
                    email: 'cliente@ejemplo.com', // TODO: Cambiar
                },
                state: 'PENDING', // Estado inicial
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
                    alert(
                        `Cita reservada exitosamente: ${JSON.stringify(
                            result.result
                        )}`
                    );
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
            <button className="back-button" onClick={() => window.history.back()}>
                Volver
            </button>
            <header className="main-header">
                <h1>Reservar Servicio</h1>
            </header>
            <main>
                <div className="service-selector">
                    <label htmlFor="service">Seleccionar servicio</label>
                    <select
                        id="service"
                        onChange={handleServiceChange}
                        value={selectedService?.ServiceName || ''}
                    >
                        {services.map((service) => (
                            <option key={service.ServiceID} value={service.ServiceName}>
                                {service.ServiceName} - {service.Duration} min
                            </option>
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
                        <label>
                            Horarios disponibles para{' '}
                            {selectedDate.toLocaleDateString('es-ES')}
                        </label>
                        <div className="time-slots">
                            {timeSlots.map((time, index) => (
                                <button
                                    key={index}
                                    className={`time-slot ${
                                        selectedTime === time ? 'selected' : ''
                                    }`}
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
                        <a href="/bookConfirmed" className="btn-book">
                            Reservar
                        </a>
                    </div>
                )}
            </main>
        </div>
    );
}

export default CalendarComponent;
