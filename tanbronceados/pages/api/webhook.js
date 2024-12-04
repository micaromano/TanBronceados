import { MercadoPagoConfig } from 'mercadopago';

const globals = require('../../config/globals');
const mercadoPagoAccessToken = globals.mercado_pago_access_token;

// Agrega el access token de Mercado Pago
const client = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const payment = req.body;
    
    if (payment.type === 'payment') {
      try {
        const response = await client.payment.findById(payment['data.id']);
        const status = response.body.status;

        if (status === 'approved') {
          // Lógica de negocio para confirmar la compra
          console.log('Pago aprobado');
        }
      } catch (error) {
        console.log('Error al obtener el pago:', error);
      }
    }

    res.status(200).send('Notificación recibida');
  } else {
    res.status(405).send('Método no permitido');
  }
}