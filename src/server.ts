import express from "express";
import cors from "cors";
import "reflect-metadata";  // Esto es importante para que los decoradores funcionen
import "reflect-metadata";
import usuarioRouter from "./routes/usuarioRutas";
import tareaRouter from "./routes/tareasRutas";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const server = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tareas",
      version: "1.0.0",
      description: "Documentación de la API para gestionar tareas",
    },
  },
  apis: ["./src/routes/**/*.ts"], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


server.use(express.json());
server.use(cors());


server.use("/api", usuarioRouter);
server.use("/api/v1", tareaRouter);

export default server;