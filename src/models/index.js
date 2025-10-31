const { Sequelize } = require("sequelize");
const User = require("./user");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
    }
);

//Import des modèles
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

//Synchroisation des modèles avec la base de données.
sequelize.sync({alter: true})//Mets à jours la base de données automatiquement.
    .then(() => console.log("Modèles synchronisés avec la base de données."))
    .catch((error) => console.error("Erreur de la synchronisation des modèles", error));

module.exports = {sequelize, User, Post, Comment};