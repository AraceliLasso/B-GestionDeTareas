import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

// Configuración de Swagger
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API",
      version: "1.0.0",
      description: "Documentación de la API de mi aplicación",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1", // Asegúrate de que el puerto y la URL sean correctos
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Esto es solo para documentación, pero indica que estamos usando JWT
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"], // Aquí se encuentran las rutas que Swagger escaneará para documentar
};

const specs = swaggerJsdoc(options);

export default (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
