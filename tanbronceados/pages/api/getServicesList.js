import ServiceModel from '../../models/ServiceModel';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { isActive } = req.query;
    console.log('isActive', isActive);

    try {
      // const services = await ServiceModel.raw.findAll({
      //   where: {
      //     isActive: 1, // Filtrar servicios activos
      //   }
      let services;
      if(!isActive){
        services = await ServiceModel.raw.findAll();
      } else {
        const isActiveBit = isActive === 'true' ? 1 : 0
        services = await ServiceModel.raw.findAll({ where: { isActive: isActiveBit }});
      }
      if (!services || services.lenght ===0) {
        return res.status(404).json({ error: 'Servicio no encontrado.' });
    }
      res.status(200).json(services);
    } catch (error) {
      console.error('No se pudo obtener los servicios', error)
      res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}