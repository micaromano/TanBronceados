import models from '../../models/ModelsWrapper';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        console.log('id', id);

        try {
            const service = await models.serviceModel.raw.findOne({ where: { ServiceID: id } });
            if (!service) {
                return res.status(404).json({ error: 'Servicio no encontrado.' });
            }
            res.status(200).json(service);
        } catch (error) {
            console.error('Error al obtener el servicio:', error);
            res.status(500).json({ error: 'Error del servidor.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}