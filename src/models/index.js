import User from "./user.js";
import Post from "./userPost.js";
import Comment from "./userComment.js";
import sequelize from "../config/db.js";



//Synchroisation des modèles avec la base de données.
sequelize.sync({alter: true})//Mets à jours la base de données automatiquement.
    .then(() => console.log("Modèles synchronisés avec la base de données."))
    .catch((error) => console.error("Erreur de la synchronisation des modèles", error));

export { sequelize, User, Post, Comment };