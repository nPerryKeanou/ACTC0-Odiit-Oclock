import { Sequelize } from "sequelize";
import express from "express";
import { getAllUsers, 
        getUserById,
        getUserByEmail, 
        createUser, 
        updateUser, 
        deleteUser,
        searchUsersBySector } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { loginUser } from "../controllers/authController.js";


const userRouter = express.Router();

//Route publique ------------------------------
//Route pour se connecter (login)
userRouter.post("/login", loginUser);
// Route pour créer un nouvel utilisateur
userRouter.post("/", createUser);


//Routes protégées ------------------------------
// Route pour récupérer tous les utilisateurs
userRouter.get("/", verifyToken, getAllUsers);
// Route pour récupérer un utilisateur par son ID
userRouter.get("/:id", verifyToken, getUserById);
// Route pour récupérer un utilisateur par son email
userRouter.get("/email/:email", verifyToken, getUserByEmail);
// Route pour mettre à jour un utilisateur
userRouter.put("/:id", verifyToken, updateUser);
// Route pour supprimer un utilisateur
userRouter.delete("/:id", verifyToken, deleteUser);
// Route pour rechercher des utilisateurs par secteur professionnel
userRouter.get("/search/sector", verifyToken, searchUsersBySector);

export default userRouter;