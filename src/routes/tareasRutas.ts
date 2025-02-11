import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware"; // Aquí importamos el middleware
import { crearTarea, obtenerTareas } from "../controllers/tareaController"; // Importamos los controladores

const tareaRouter = Router();

tareaRouter.post("/tareas", authenticateJWT, crearTarea); 
tareaRouter.get("/tareas", authenticateJWT, obtenerTareas);

export default tareaRouter;