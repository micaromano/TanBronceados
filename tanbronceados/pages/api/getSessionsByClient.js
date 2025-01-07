//const SessionModel = require('../models/SessionModel');
//const ClientModel = require('../models/ClientModel');
import ClientModel from '../../models/ClientModel';
import ServiceModel from '../../models/ServiceModel';
import SessionModel from '../../models/SessionModel';


export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'El id del cliente es requerido.' });
    }

    // Obtener sesiones asociadas al cliente
    const sessions = await SessionModel.raw.findAll({
      where: { clientId: id }
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error al obtener sesiones:', error);
    res.status(500).json({ message: 'Error al obtener sesiones.', error: error.message });
  }
}