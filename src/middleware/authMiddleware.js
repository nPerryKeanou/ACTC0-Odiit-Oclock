import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET env variable — set it in .env or your environment');
}

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé.' });
        }

        req.user = user; // Attache l'utilisateur à la requête pour une utilisation ultérieure
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide.' });
    }
};