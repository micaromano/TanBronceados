const ServiceModel = require('../../../models/ServiceModel'); // Modelo del servicio

async function handler(req, res) {

    if (req.method !== 'PUT') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { ServiceID } = req.query;
  
    console.log('ServiceID', ServiceID);
    try{

    // Se busca el servicio que se quiere dar de alta
    const service = await ServiceModel.raw.findOne({ where: { ServiceID: ServiceID } });
    console.log('service', service);

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado.' });
    }

    // Habilitar el servicio
    const result = await ServiceModel.raw.update(
    { isActive: true }, // Cambiar estado a activado
    { where: { ServiceID: ServiceID } } // Condición para encontrar el servicio
    );
    
    if (result[0] === 0) {
      return res.status(400).json({ error: 'No se pudo habilitar el servicio.' });
    }

    return res.status(201).json({ message: 'Servicio habilitado correctamente.' });

    } catch (error) {
    console.error('Error during enable service:', error);
    return res.status(500).json({ error: 'Error del servidor al habilitar el servicio.' });
    }
  }
  
  module.exports = handler;