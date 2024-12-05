const globals = require('../../config/globals');
const url = globals.url;
const mercadoPagoAccessToken = globals.mercado_pago_access_token;

// Importa la configuración del SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega el access token de Mercado Pago
const client = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método no permitido' });
  }
    
  try {
  const { items, clientEmail } = req.body;
  console.log('items', items);
  console.log('clientEmail', clientEmail);

  // Valida que existan los campos requeridos
  if (!items || !Array.isArray(items) || !clientEmail) {
    return res.status(400).json({ error: "Datos incompletos o inválidos" });
  }

  // Configura la preferencia de pago
  const preference = new Preference(client);

  // Crear la preferencia
  const response = await preference.create({
      body: {
      items: items.map(item => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: "UYU",
      })),
      payer: {
          email: clientEmail,
      },
      back_urls: {
          success: `https://www.google.com/`, // Cambiar URL en producción
          failure: `https://www.google.com/`, // Cambiar URL en producción
          pending: `https://www.google.com/`, // Cambiar URL en producción
      },
      //notification_url: `${url}/api/webhook`, // URL del webhook en Next.js
      auto_return: 'approved',
      },
    });
    console.log('Respuesta completa de Mercado Pago:', response);
    res.status(200).json({ id: response.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}