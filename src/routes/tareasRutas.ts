import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware"; // Aquí importamos el middleware
import { crearTarea, obtenerTareas } from "../controllers/tareaController"; // Importamos los controladores

const tareaRouter = Router();

tareaRouter.post("/tarea", authenticateJWT, crearTarea); 
tareaRouter.get("/tarea", authenticateJWT, obtenerTareas);

export default tareaRouter;