const { User } = require('../models/userModel');
const sqlz = require('sequelize');

// Crée un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { username, email, passwordHash, professionalSector, bio } = req.body;
        const newUser = await User.create({ username, email, passwordHash, professionalSector, bio });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
    }
};

// Récupère un utilisateur par son ID
exports.getUserById = async (req, res) => {
    try {
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