import { Sequelize } from "sequelize";
import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const UserRouter = express.Router();

// Route pour créer un nouvel utilisateur
UserRouter.post('/users', createUser);
// Route pour récupérer tous les utilisateurs
UserRouter.get('/users', getAllUsers);
// Route pour récupérer un utilisateur par son ID
UserRouter.get('/users/:id', getUserById);
// Route pour récupérer un utilisateur par son email
UserRouter.get('/users/email/:email', getUserByEmail);
// Route pour mettre à jour un utilisateur par son ID
UserRouter.put('/users/:id', updateUser);
// Route pour supprimer un utilisateur par son ID
UserRouter.delete('/users/:id', deleteUser);

export default UserRouter;