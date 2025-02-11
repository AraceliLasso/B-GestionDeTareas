import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware"; // Aquí importamos el middleware
import { actualizarTarea, crearTarea, eliminarTarea, obtenerTareas } from "../controllers/tareaController"; // Importamos los controladores

const tareaRouter = Router();

/**
 * @swagger
 * /api/v1/tarea:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nueva tarea"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción de la tarea"
 *               estaCompletada:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Error al crear la tarea
 */
tareaRouter.post("/tarea", authenticateJWT, crearTarea); 

/**
 * @swagger
 * /api/v1/tarea:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Obtiene todas las tareas almacenadas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       500:
 *         description: Error al obtener las tareas
 */
tareaRouter.get("/tarea", authenticateJWT, obtenerTareas);

/**
 * @swagger
 * /api/v1/tarea/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Actualiza los detalles de una tarea existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Tarea actualizada"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción actualizada"
 *               estaCompletada:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       400:
 *         description: Error al actualizar la tarea
 *       404:
 *         description: Tarea no encontrada
 */
tareaRouter.put("/tarea/:id", authenticateJWT, actualizarTarea); 

/**
 * @swagger
 * /api/v1/tarea/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea del sistema por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 *       400:
 *         description: Error al eliminar la tarea
 *       404:
 *         description: Tarea no encontrada
 */
tareaRouter.delete("/tarea/:id", authenticateJWT, eliminarTarea);

export default tareaRouter;
