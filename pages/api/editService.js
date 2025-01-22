const ServiceModel = require('../../models/ServiceModel');

async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { serviceID, serviceName, serviceDescription, price, duration, horaDesde, horaHasta } = req.body;

  console.log('serviceID, serviceName, serviceDescription, price, duration', serviceID, serviceName, serviceDescription, price, duration);

    // Se validan campos antes de procesarlos
    // name
    if (!serviceName.trim()) {
      return res.status(404).json({ error: 'El nombre es obligatorio.' });
    } else if (serviceName.length < 3) {
      return res.status(404).json({ error: 'El nombre debe tener al menos 3 caracteres.' });
    }

    // description
    if (!serviceDescription.trim()) {
      return res.status(404).json({ error: 'La descripción es obligatoria.' });
    } else if (serviceDescription.length < 3) {
      return res.status(404).json({ error: 'La descripción debe tener al menos 3 caracteres.' });
    }
    
    // price
    if (!price) {
      return res.status(404).json({ error: 'El precio es obligatorio.' });
    } else if (!/^\d+$/.test(price)) {
      return res.status(404).json({ error: 'El precio debe ser un valor númerico.' });
    } else if (parseFloat(price) <= 0) {
      return res.status(404).json({ error: 'El precio debe ser mayor que cero.' });
    }

    // duration
    if (!duration) {
      return res.status(404).json({ error: 'La duración es obligatoria.' });
    } else if (!/^\d+$/.test(duration)) {
      return res.status(404).json({ error: 'La duración debe ser un valor númerico.' });
    } else if (parseFloat(duration) <= 0) {
      return res.status(404).json({ error: 'La duración debe ser mayor que cero.' });
    }

    if (!horaDesde.trim()) {
      return res.status(404).json({ error: 'La horaDesde es obligatoria.'});
    } else if (parseFloat(horaDesde) <= 0) {
      return res.status(404).json({ error: 'La horaDesde debe ser mayor que cero.'});
    } else if (!/^\d+$/.test(horaDesde)) {
      return res.status(404).json({ error: 'La horaDesde debe ser un valor númerico.'});
    } else if (parseFloat(horaDesde) >= 24) {
      return res.status(404).json({ error: 'La horaDesde debe ser menor a 24.'});
    }

    if (!horaHasta.trim()) {
      return res.status(404).json({ error: 'La horaHasta es obligatoria.'});
    } else if (parseFloat(horaHasta) <= 0) {
      return res.status(404).json({ error: 'La horaHasta debe ser mayor que cero.'});
    } else if (!/^\d+$/.test(horaHasta)) {
      return res.status(404).json({ error: 'La horaHasta debe ser un valor númerico.'});
    } else if (parseFloat(horaHasta) <= parseFloat(horaDesde)) {
      return res.status(404).json({ error: 'La horaHasta debe ser mayor a la horaDesde.'});
    }

    //TODO: Verificar que no exista el servicio por el nombre

    try{

    // Se busca el servicio que se quiere editar
    const service = await ServiceModel.raw.findOne({ where: { ServiceId: serviceID } });
    console.log('service', service);

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado.' });
    }

    // Edita el servicio
    const result = await ServiceModel.raw.update(
      { ServiceName: serviceName, ServiceDescription: serviceDescription, Price: price, Duration: duration, HoraDesde: horaDesde, HoraHasta: horaHasta }, // Campos a actualizar
      { where: { ServiceID: serviceID } } // Condición para encontrar el servicio
    );
    
    if (result[0] === 0) {
      return res.status(400).json({ error: 'No se pudo editar el servicio.' });
    }

    return res.status(201).json({ message: 'Servicio editado correctamente.' });
  
    } catch (error) {
      console.error('Error during service editing:', error);
      return res.status(500).json({ error: 'Error del servidor al editar servicio.' });
    }
}

module.exports = handler;