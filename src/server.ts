import express from "express";
import cors from "cors";
import "reflect-metadata";
import usuarioRouter from "./routes/usuarioRutas";
import tareaRouter from "./routes/tareasRutas";
const path = require("path")

const swaggerUI = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestor de tareas",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.ts")}`]
}


const server = express();

server.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de Tareas!");
});

server.use(express.json());
server.use(cors());
server.use("/api", usuarioRouter);
server.use("/api/v1", tareaRouter);
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerSpec)))


export default server;