import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { conexionDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import horseRoutes from "./routes/horseRoutes";
import imageRoutes from "./routes/imageRoutes";
import activityRoutes from "./routes/activityRoutes";

dotenv.config();
conexionDB();

const app = express();
app.use(cors(corsConfig));

// Logging
app.use(morgan("dev"));

// Leer datos del formulario
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/horses", horseRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/upload", imageRoutes);


export default app;
