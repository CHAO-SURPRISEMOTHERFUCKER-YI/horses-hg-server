import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan"

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.magenta.bold("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(colors.red.bold("ERROR: " + error));
  }
}

connectDB();

// Instancia de express
const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error("Error de CORS"))
    }
  },
};
server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

server.use(morgan("dev"))

server.use("/api/products", router);

server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});

export default server;
