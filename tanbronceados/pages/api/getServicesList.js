import ServiceModel from '../../models/ServiceModel';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // const services = await ServiceModel.raw.findAll({
      //   where: {
      //     isActive: 1, // Filtrar servicios activos
      //   },
      const services = await ServiceModel.raw.findAll();  // Esto devuelve un arreglo con todos los servicios
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