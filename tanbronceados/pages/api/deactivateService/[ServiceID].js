const models = require('../../../models/ModelsWrapper'); // Modelo del servicio

async function handler(req, res) {

    if (req.method !== 'PUT') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { ServiceID } = req.query;
  
    console.log('ServiceID', ServiceID);
    try{

    // Se busca el servicio que se quiere dar de baja
    const service = await models.serviceModel.raw.findOne({ where: { ServiceID: ServiceID } });
    console.log('service', service);

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado.' });
    }

    // Deshabilitar el servicio
    const result = await models.serviceModel.raw.update(
    { isActive: false }, // Cambiar estado a desactivado
    { where: { ServiceID: ServiceID } } // Condición para encontrar el servicio
    );
    
    if (result[0] === 0) {
      return res.status(400).json({ error: 'No se pudo deshabilitar el servicio.' });
    }

    return res.status(201).json({ message: 'Servicio deshabilitado correctamente.' });

    } catch (error) {
      console.error('Error during deactivate service:', error);
      return res.status(500).json({ error: 'Error del servidor al deshabilitar el servicio.' });
    }
  }
  
  module.exports = handler;