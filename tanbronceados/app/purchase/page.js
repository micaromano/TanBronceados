// pages/ComprarServicio.js (Next.js page component for RF6)
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import CalendarComponent from '../../app/book/page'; // Importa el componente de Calendar para RF7
import '../../styles/Purchase.css';

function ComprarServicio() {
    const [selectedService, setSelectedService] = useState('');
    const [purchaseType, setPurchaseType] = useState(''); // Single session or package
    const [showSummary, setShowSummary] = useState(false);
    const router = useRouter();

    const handleServiceSelection = (event) => {
        setSelectedService(event.target.value);
    };

    const handlePurchaseTypeChange = (event) => {
        setPurchaseType(event.target.value);
    };

    const handleProceedToSummary = () => {
        if (selectedService && purchaseType) {
            setShowSummary(true);
        } else {
            alert('Por favor, selecciona un servicio y el tipo de compra.');
        }
    };

    const handleProceedToBooking = () => {
        router.push('/'); // Navega a la página de reserva (RF7) TODO: Ver si cambiar a /book o a que
    };

    const getPrice = () => {
        switch (purchaseType) {
            case 'individual':
                return 1050;
            case 'cuponera_4':
                return 4000;
            case 'cuponera_6':
                return 5900;
            default:
                return 0;
        }
    };

    return (
        <div className="compra-servicio-container">
            <h1>Compra de Servicios de Bronceado</h1>
            <div className="service-selection">
                <label htmlFor="service">Selecciona el tipo de bronceado:</label>
                <select id="service" value={selectedService} onChange={handleServiceSelection}>
                    <option value="">-- Selecciona un servicio --</option>
                    <option value="bronceado_organico">Bronceado Orgánico</option>
                </select>
            </div>

            <div className="purchase-type-selection">
                <label htmlFor="purchase-type">Selecciona el tipo de compra:</label>
                <select id="purchase-type" value={purchaseType} onChange={handlePurchaseTypeChange}>
                    <option value="">-- Selecciona el tipo de compra --</option>
                    <option value="individual">Sesión Individual - $1050</option>
                    <option value="cuponera_4">Cuponera (4 sesiones) - $4000</option>
                    <option value="cuponera_6">Cuponera (6 sesiones) - $5900</option>
                </select>
            </div>

            {showSummary && (
                <div className="purchase-summary">
                    <h3>Resumen de la Compra</h3>
                    <p>Servicio: {selectedService === 'bronceado_organico' ? 'Bronceado Orgánico' : ''}</p>
                    <p>Tipo de compra: {purchaseType === 'individual' ? 'Sesión Individual' : purchaseType === 'cuponera_4' ? 'Cuponera (4 sesiones)' : 'Cuponera (6 sesiones)'}</p>
                    <p>Precio: ${getPrice()}</p>
                    <button onClick={handleProceedToBooking} className="proceed-to-booking-button">Comprar</button>
                </div>
            )}

            {!showSummary && (
                <button onClick={handleProceedToSummary} className="proceed-to-summary-button">
                    Continuar
                </button>
            )}
        </div>
    );
}

export default ComprarServicio;
