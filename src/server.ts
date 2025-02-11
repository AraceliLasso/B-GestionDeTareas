import express from "express";
import cors from "cors";
import "reflect-metadata";
import usuarioRouter from "./routes/usuarioRutas";
import tareaRouter from "./routes/tareasRutas";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const server = express(); // Instancia de express

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tareas",
      version: "1.0.0",
      description: "Documentación de la API para gestionar tareas",
    },
    servers: [{ url: "http://localhost:3000/api" }],  // El prefijo "api" aquí está bien
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/**/*.ts"],  // Apunta a las rutas correctamente
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares
server.use(express.json());
server.use(cors());

// Rutas
server.use("/api/usuario", usuarioRouter); // Aquí es donde debes usar "/api/usuario"
server.use("/api/v1/tarea", tareaRouter); // Aquí es donde debes usar "/api/v1/tarea"

export default server; // Exporta la instancia del servidor
