'use client';

import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useState } from 'react';

const globals = require('../../config/globals');
const mercadoPagoPublicKey = globals.mercado_pago_public_key;

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


function PaymentPage() {

    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('APP_USR-304f5f0f-b381-4b27-8339-d8cc9fc41e7f', {
        locale: "es-UY",
    });
    
    const createPreference  = async () => {
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
            
            // if (!response.ok) {
            //     const errorDetails = await response.json();
            //     console.error("Detalles del error:", errorDetails);
            //     throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            //   }

            const { id } = await response.json();
            return id;
            //console.log('id', id);
            
            // if (!id) {
            //     throw new Error('El ID de la preferencia no se recibió correctamente.');
            // }
            
        } catch (error) {
            console.error("Error al enviar el objeto de prueba:", error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };


            // const mp = new window.MercadoPago('APP_USR-c8e57905-9559-4486-876c-69a70bfbbc8b', {
            //     locale: 'es-UY', // Cambia según el país
            // });

            // mp.checkout({
            //     preference: { id },
            //     autoOpen: true, // Abrir el checkout automáticamente
            // });
        
            
    return (
    <>
    <Button
        variant="primary"
        onClick={handleBuy}
    >
        Comprar
    </Button>
    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
    </>
    )
    
}

export default PaymentPage;