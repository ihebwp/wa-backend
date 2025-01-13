import express from "express";
import bodyparser from "body-parser";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
// import dotenv from 'dotenv';
import userRoutes from "./Routes/userRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import commandRoutes from "./Routes/commandRoutes.js";


const app = express();
const PORT = 4000;
connectDB();

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

// indice pour pointer sur le dossier public pour les fichiers
app.use(express.static("public"));

app.use(cookieParser())

app.use(productRoutes);
app.use(userRoutes);
app.use(commandRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
