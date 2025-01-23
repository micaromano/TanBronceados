
import models from '../../models/ModelsWrapper';

async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, description, price, duration, horaDesde, horaHasta } = req.body;

  console.log('name, description, price, duration, horaDesde, horaHasta', name, description, price, duration, horaDesde, horaHasta);

    // Se validan campos antes de procesarlos
    // name
    if (!name.trim()) {
      return res.status(404).json({ error: 'El nombre es obligatorio.' });
    } else if (name.length < 3) {
      return res.status(404).json({ error: 'El nombre debe tener al menos 3 caracteres.' });
    }

    // description
    if (!description.trim()) {
      return res.status(404).json({ error: 'La descripción es obligatoria.' });
    } else if (description.length < 3) {
      return res.status(404).json({ error: 'La descripción debe tener al menos 3 caracteres.' });
    }
    
    // price
    if (!price.trim()) {
      return res.status(404).json({ error: 'El precio es obligatorio.' });
    } else if (!/^\d+$/.test(price)) {
      return res.status(404).json({ error: 'El precio debe ser un valor númerico.' });
    } else if (parseFloat(price) <= 0) {
      return res.status(404).json({ error: 'El precio debe ser mayor que cero.' });
    }

    // duration
    if (!duration.trim()) {
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

    //Crea el servicio en la base de datos
    const newService = await models.serviceModel.raw.create({
        ServiceName: name,
        ServiceDescription: description,
        Price: price,
        Duration: duration,
        HoraDesde: horaDesde,
        HoraHasta: horaHasta,
      });

    console.log('newService', newService);
    
    return res.status(201).json({ message: 'Servicio registrado correctamente.' });
  
    } catch (error) {
      console.error('Error during service register:', error);
      return res.status(500).json({ error: 'Error del servidor al registrar servicio.' });
    }
}

module.exports = handler;