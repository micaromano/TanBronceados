'use client';

import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const globals = require('../../config/globals');
const mercadoPagoPublicKey = globals.mercado_pago_public_key;

function PaymentPage() {

    useEffect(() => {
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

    const sendTestRequest  = async () => {
        const testRequest = {
            clientEmail: "cliente.ficticio@example.com",
            items: [
              {
                title: "Bronceado Individual",
                unit_price: 50,
                quantity: 2,
              },
              {
                title: "Cuponera de Bronceados",
                unit_price: 200,
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

    return (
        <Button
            variant="primary"
            onClick={sendTestRequest}
        >
            Enviar
        </Button>
    )
}

export default PaymentPage;