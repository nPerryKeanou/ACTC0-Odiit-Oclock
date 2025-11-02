import { Sequelize } from "sequelize";
import express from "express";
import { getAllUsers, 
        getUserById,
        getUserByEmail, 
        createUser, 
        updateUser, 
        deleteUser,
        searchUsersBySector } from "../controllers/userController.js";


const userRouter = express.Router();

// Route pour créer un nouvel utilisateur
userRouter.post("/", createUser);

// Route pour récupérer tous les utilisateurs
userRouter.get("/", getAllUsers);

// Route pour récupérer un utilisateur par son ID
userRouter.get("/:id", getUserById);

// Route pour récupérer un utilisateur par son email
userRouter.get("/email/:email", getUserByEmail);

// Route pour mettre à jour un utilisateur
userRouter.put("/:id", updateUser);

// Route pour supprimer un utilisateur
userRouter.delete("/:id", deleteUser);

// Route pour rechercher des utilisateurs par secteur professionnel
userRouter.get("/search/sector", searchUsersBySector);

export default userRouter;