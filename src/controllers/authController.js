/**
 * Rôle : controller Express pour l'endpoint POST /login. Reçoit email/password, vérifie l'utilisateur, crée un JWT et renvoie token + user (sans passwordHash).
Étapes logiques :
Récupérer et valider email et password depuis req.body (retour 400 si manquant).
Chercher l'utilisateur en base (User.findOne where email). Si absent → 401.
Vérifier le mot de passe : await bcrypt.compare(password, user.passwordHash). Si faux → 401.
Signer le JWT : jwt.sign(payload, JWT_SECRET, { expiresIn: '...' }). Le payload contient typiquement l'id (et optionnellement tokenVersion).
Supprimer passwordHash de la réponse (destructuration) et renvoyer { token, user } avec 200.
Gestion des erreurs : catch → 500.
Points de sécurité / bonnes pratiques :

JWT_SECRET dans les variables d'environnement, pas de fallback en production.
Expiration courte pour l'access token (ex : 15m) ; utiliser refresh tokens si besoin.
Ne jamais renvoyer passwordHash.
Utiliser HTTPS côté client pour protéger l'Authorization header.
Pour pouvoir révoquer des tokens, inclure tokenVersion dans le payload ou stocker refresh tokens (hashés) en DB.
 */

import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET');
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation des champs obligatoires
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Les champs email et password sont obligatoires.' 
            });
        }

        // Recherche de l'utilisateur par email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
        }

        // Comparaison du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Retourne le token et l'utilisateur sans le hash du mot de passe
        const { passwordHash: _, ...userWithoutPassword } = user.toJSON();
        res.status(200).json({ token, user: userWithoutPassword });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ 
            error: 'Erreur lors de la connexion de l\'utilisateur.' 
        });
    }
};