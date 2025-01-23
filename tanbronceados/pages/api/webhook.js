import { MercadoPagoConfig } from 'mercadopago';

const globals = require('../../config/globals');
const mercadoPagoAccessToken = globals.mercado_pago_access_token;

// Agrega el access token de Mercado Pago
const client = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken });

import models from '../../models/ModelsWrapper';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const payment = req.body;
    
    if (payment.type === 'payment') {
      try {
        const response = await client.payment.findById(payment['data.id']);
        const status = response.body.status;

        if (status === 'approved') {
          // Crear la sesión comprada
          const newSession = {
            SessionName: payment.items[0].title, // Nombre del servicio comprado
            SessionPurchaseDate: new Date(),        // Fecha actual como fecha de compra
            Price: paymentInfo.items[0].unit_price, // Precio del servicio
            ServiceID: item.id,              // Asociar el servicio usando idService
          };
          // Guardar la sesión en la base de datos
          const createdSession = await models.sessionModel.create(newSession);
          console.log('Sesión creada:', createdSession.toJSON());
          
          console.log('Pago aprobado');
        }
        res.status(200).json({ message: 'Webhook procesado correctamente' });
      } catch (error) {
        console.log('Error al obtener el pago:', error);
        console.error('Error en el webhook:', error);
        res.status(500).json({ error: error.message });
      }
    }

    res.status(200).send('Notificación recibida');
  } else {
    res.status(405).send('Método no permitido');
  }
}