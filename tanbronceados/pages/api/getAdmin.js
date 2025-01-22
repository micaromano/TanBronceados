import AdminModel from '../../models/AdminModel';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { username } = req.query;
        console.log('username', username);

        try {
            const admin = await AdminModel.raw.findOne({ where: { Username: username } });
            if (!admin) {
                return res.status(404).json({ error: 'Admin no encontrado.' });
            }
            res.status(200).json(admin);
        } catch (error) {
            console.error('Error al obtener el admin:', error);
            res.status(500).json({ error: 'Error del servidor.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}