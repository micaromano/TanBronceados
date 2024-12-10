// pages/ComprarServicio.js (Next.js page component for RF6)
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import CalendarComponent from '../../app/book/page'; // Importa el componente de Calendar para RF7
import '../../styles/Purchase.css';

function ComprarServicio() {
    const [selectedService, setSelectedService] = useState('');
    const [purchaseType, setPurchaseType] = useState(''); // Single session or package
    const [showSummary, setShowSummary] = useState(false);
    const [service, setService] = useState(null);
    const [services, setServices] = useState([]);
    const [session, setSession] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [sessionsFilter, setSessionsFilter] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // Traer lista de servicios
        const fetchServices = async () => {
            try {
              const response = await fetch('/api/getServicesList');
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
              const dataServices = await response.json();
              setServices(dataServices);
            } catch (error) {
              console.error('Error al obtener servicios:', error);
            }
        };
      
        fetchServices();

        // Traer lista de sesiones
        const fetchSessions = async () => {
            try {
              const response = await fetch('/api/getSessionsList');
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
              const dataSessions = await response.json();
              setSessions(dataSessions);
            } catch (error) {
              console.error('Error al obtener servicios:', error);
            }
        };
      
        fetchSessions();

        // Inicializar Mercado Pago
        // Agregar dinámicamente el script de Mercado Pago
        const script = document.createElement('script');
        script.src = "https://sdk.mercadopago.com/js/v2";
        script.async = true;
        //document.body.appendChild(script);
        script.onload = () => {
            // Verifica si el objeto MercadoPago está 
        if (window.MercadoPago) {
            const mp = new window.MercadoPago('APP_USR-c8e57905-9559-4486-876c-69a70bfbbc8b', {
              locale: 'es-AR', // Cambia según tu región
            });
            console.log('SDK inicializado correctamente:', mp);
        } else {
            console.error('El objeto MercadoPago no está disponible.');
        }
        // Aquí puedes usar el objeto `mp` para manejar el checkout
          };
        document.body.appendChild(script);
    
        return () => {
          // Eliminar el script cuando el componente se desmonte (opcional)
          document.body.removeChild(script);
        };
      }, []);

      useEffect(() => {

        let service = services.find(service => service.ServiceID === +selectedService);
        setService(service);

        if (selectedService){
            setSessionsFilter(sessions.filter(session => session.ServiceID === +selectedService));
        } else {
            setSessionsFilter([]);
        }

      }, [selectedService])

      useEffect(() => {

        let session = sessions.find(session => session.SessionID === +purchaseType);
        console.log('session', session);
        setSession(session);

      }, [purchaseType])

      const sendTestRequest  = async () => {
        const testRequest = {
            clientEmail: "cliente.ficticio@example.com",
            items: [
              {
                title: service.ServiceName + ' - ' + session.SessionName,
                unit_price: session.Price,
                quantity: 1,
              }
            ]
        }
        try {
            const response = await fetch('/api/mercadoPagoCreatePreference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testRequest),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Detalles del error:", errorDetails);
                throw new Error(`Error en la respuesta del servidor: ${response.status}`);
              }

            const { id } = await response.json();
            console.log('id', id);

            if (!id) {
                throw new Error('El ID de la preferencia no se recibió correctamente.');
              }

            const mp = new window.MercadoPago('APP_USR-c8e57905-9559-4486-876c-69a70bfbbc8b', {
                locale: 'es-UY', // Cambia según el país
            });

            mp.checkout({
                preference: { id },
                autoOpen: true, // Abrir el checkout automáticamente
            });
        } catch (error) {
            console.error("Error al enviar el objeto de prueba:", error);
        }

    }

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
        router.push('/payment'); // Navega a la página de reserva (RF7) TODO: Ver si cambiar a /book o a que
    };

    return (
        <div className="compra-servicio-container">
            <h1>Compra de Servicios de Bronceado</h1>
            <div className="service-selection">
                <label htmlFor="service">Selecciona el tipo de bronceado:</label>
                <select id="service" value={selectedService} onChange={handleServiceSelection}>
                    <option value="">-- Selecciona un servicio --</option>
                    {
                        services.map(
                            service => <option key={service.ServiceID} value={service.ServiceID}>{service.ServiceName}</option>
                        )
                    }
                </select>
            </div>

            <div className="purchase-type-selection">
                <label htmlFor="purchase-type">Selecciona el tipo de compra:</label>
                <select id="purchase-type" value={purchaseType} onChange={handlePurchaseTypeChange}>
                    <option value="">-- Selecciona el tipo de compra --</option>
                    {
                        sessionsFilter.map(
                            session => <option key={session.SessionID} value={session.SessionID}>{session.SessionName}</option>
                        )
                    }
                </select>
            </div>

            {showSummary && (
                <div className="purchase-summary">
                    <h3>Resumen de la Compra</h3>
                    <p>Servicio: {service ? service.ServiceName : ''}</p>
                    <p>Tipo de compra: {session ? session.SessionName : ''}</p>
                    <p>Precio: ${session.Price}</p>
                    <button onClick={sendTestRequest} className="proceed-to-booking-button">Comprar</button>
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
