import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import userRouter from "./routes/userRouter.js";
import sequelise from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;



// Health check endpoint pour vérifier la connexion à la base de données avant de traiter les requêtes.
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate(); // Teste la connexion à la BDD
    res.status(200).send('OK');
  } catch (error) {
    res.status(503).send('Service Unavailable');
  }
});



app.use("/users", userRouter);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});