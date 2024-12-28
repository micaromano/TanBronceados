//const SessionModel = require('../models/SessionModel');
//const ClientModel = require('../models/ClientModel');
import ClientModel from '../../models/ClientModel';
import ServiceModel from '../../models/ServiceModel';
import SessionModel from '../../models/SessionModel';


export default async function handler(req, res) {
  console.log('entro en la funcion')
  try {
    const { clientEmail } = req.query;
    console.log('entro en el try')
    // Asegurarnos de que el cliente mail sea válido
    if (!clientEmail) {
      return res.status(400).json({ message: 'El mail del cliente es requerido.' });
    }

    // Obtener sesiones asociadas al cliente
    const allSessions = await SessionModel.raw.findAll({
      include: [
        { model: ClientModel.raw, as: 'client' },
        { model: ServiceModel.raw, as: 'service' }, // Incluye servicios relacionados
      ],
    });

    console.log('allSessions: ', allSessions);

    // Obtener sesiones asociadas al cliente
    const sessions = await SessionModel.raw.findAll({
      where: { clientEmail: clientEmail },
      include: [
        { model: ClientModel.raw, as: 'client' },
        { model: SessionModel.raw.associations.service.target, as: 'service' }, // Incluye servicios relacionados
      ],
    });

    console.log('clientSessions: ', sessions);

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error al obtener sesiones:', error);
    res.status(500).json({ message: 'Error al obtener sesiones.', error: error.message });
  }
}