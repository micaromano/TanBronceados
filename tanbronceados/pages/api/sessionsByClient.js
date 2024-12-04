const SessionModel = require('../models/SessionModel');
const ClientModel = require('../models/ClientModel');

const getSessionsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Asegurarnos de que el cliente ID sea válido
    if (!clientId) {
      return res.status(400).json({ message: 'El ID del cliente es requerido.' });
    }

    // Obtener sesiones asociadas al cliente
    const sessions = await SessionModel.raw.findAll({
      where: { ClientID: clientId },
      include: [
        { model: ClientModel.raw, as: 'client' },
        { model: SessionModel.raw.associations.service.target, as: 'service' }, // Incluye servicios relacionados
      ],
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error al obtener sesiones:', error);
    res.status(500).json({ message: 'Error al obtener sesiones.' });
  }
};

module.exports = {
  getSessionsByClient,
};
