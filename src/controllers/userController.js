import User from '../models/user.js';
import { Op } from 'sequelize';
//const { User } = require('../models/user.js');
//const sqlz = require('sequelize');

// Crée un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { username, email, passwordHash, professionalSector, bio } = req.body;
        if(!username || !email || !passwordHash) {
            return res.status(400).json({ error: 'Les champs username, email et passwordHash sont obligatoires.' });
        };
        const newUser = await User.create({ username, email, passwordHash, professionalSector, bio });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
    }
};

// Récupère tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

// Récupère un utilisateur par son ID
exports.getUserById = async (req, res) => {
    try {
        if(!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ error: 'ID utilisateur invalide.' });
        };
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
};

// Récupérer un utilisateur par son email
exports.getUserByEmail = async (req, res) => {
    try {
        if(!req.params.email) {
            return res.status(400).json({ error: 'Email utilisateur invalide.' });
        };
        const user = await User.findOne({ where: {email: req.params.email}});
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
};

// Met à jours un utilisateur par son ID
/*
- exporte une fonction asynchrone updateUser utilisée comme contrôleur Express (req, res).
- try / catch : capture les erreurs et renvoie 500 en cas d'exception.
- Destructuration : récupère username, email, passwordHash, professionalSector, bio depuis req.body.
- Mise à jour : appelle User.update({...}, { where: { id: req.params.id } }).
- Avec Sequelize, User.update retourne un tableau dont le premier élément est le nombre de lignes affectées. La ligne const [updated] = ... récupère ce nombre.
    Condition :
- si updated est truthy (généralement > 0) : récupère l'utilisateur mis à jour avec User.findByPk(req.params.id) puis renvoie cet objet avec status 200.
- sinon : renvoie 404 avec { error: 'Utilisateur non trouvé.' }.
- catch : renvoie 500 et un message d'erreur générique.
*/
exports.updateUser = async (req, res) => {
    try {
        const { username, email, passwordHash, professionalSector, bio } = req.body;
        if(!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ error: 'ID utilisateur invalide.' });
        };
        const [updated] = await User.update(
            { username, email, passwordHash, professionalSector, bio },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
    } catch(error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
};

// Supprime un utilisateur par son ID
//Utilise la méthode destroy de Sequelize pour supprimer l'utilisateur
//deleted contient le nombre de lignes supprimées (0 ou 1)
//Si deleted est truthy (> 0) : renvoie un statut 200 avec message de succès
//Si deleted est falsy (0) : renvoie un statut 404 car l'utilisateur n'existe pas
exports.deleteUser = async (req, res) => {
    try {
        if(!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ error: 'ID utilisateur invalide.' });
        };
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
};

// Recherche d'utilisateurs par secteur professionnel
/**
     * Spécification des attributs à retourner
 * Ajout d'un ordre de tri
 * Limitation du nombre de résultats
 * Meilleure gestion du cas où aucun utilisateur n'est trouvé
 * Logging des erreurs pour le debugging
 * Utilisation appropriée des opérateurs Sequelize pour la recherche insensible à la casse

 */
exports.searchUsersBySector = async (req, res) => {
    try {
        const { sector } = req.query;
        if(!sector) {
            return res.status(400).json({ error: 'Le secteur professionnel est requis pour la recherche.' });
        }

        // Utilisation d'options plus complètes
        const users = await User.findAll({
            where: {
                professionalSector: {
                    [Op.iLike]: `%${sector}%`
                }
            },
            attributes: ['id', 'username', 'email', 'professionalSector', 'bio'], // Spécifier les champs à retourner
            order: [['username', 'ASC']], // Ajouter un tri
            limit: 50 // Limiter le nombre de résultats
        });

        if (!users.length) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé dans ce secteur.' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur searchUsersBySector:', error);
        res.status(500).json({ error: 'Erreur lors de la recherche des utilisateurs.' });
    }
};