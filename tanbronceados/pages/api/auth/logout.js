import { clearTokenCookie } from '../utils/auth';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        clearTokenCookie(res);
        return res.status(200).json({ message: 'Logout successful' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
