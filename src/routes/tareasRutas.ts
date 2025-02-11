import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware"; // Aquí importamos el middleware
import { actualizarTarea, crearTarea, eliminarTarea, obtenerTareas } from "../controllers/tareaController"; // Importamos los controladores

const tareaRouter = Router();

tareaRouter.post("/tarea", authenticateJWT, crearTarea); 
tareaRouter.get("/tarea", authenticateJWT, obtenerTareas);
tareaRouter.put("/tarea/:id", authenticateJWT, actualizarTarea); 
tareaRouter.delete("/tarea/:id", authenticateJWT, eliminarTarea);
export default tareaRouter;