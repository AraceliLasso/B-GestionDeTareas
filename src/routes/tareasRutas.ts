import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware"; 
import { actualizarTarea, crearTarea, eliminarTarea, obtenerTareas } from "../controllers/tareaController";

const tareaRouter = Router();

/**
 * @swagger
 * /v1/tarea:
 *   post:
 *     summary: Crea una nueva tarea
 *     description: Crea una nueva tarea en la base de datos. Se requiere autenticación.
 *     tags: [Tarea]
 *     security:
 *       - bearerAuth: []  # Aplica la seguridad solo a esta operación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Mi tarea"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción de la tarea"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
tareaRouter.post("/tarea", authenticateJWT, crearTarea);

/**
 * @swagger
 * /v1/tarea:
 *   get:
 *     summary: Obtiene todas las tareas
 *     description: Devuelve la lista de tareas del usuario autenticado.
 *     tags: [Tarea]
 *     security:
 *       - bearerAuth: []  # Aplica la seguridad solo a esta operación
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
tareaRouter.get("/tarea", authenticateJWT, obtenerTareas);

/**
 * @swagger
 * /v1/tarea/{id}:
 *   put:
 *     summary: Actualiza una tarea
 *     description: Modifica los datos de una tarea existente. Se requiere autenticación.
 *     tags: [Tarea]
 *     security:
 *       - bearerAuth: []  # Aplica la seguridad solo a esta operación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nueva Tarea"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción de la tarea actualizada"
 *               estaCompletada:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
tareaRouter.put("/tarea/:id", authenticateJWT, actualizarTarea);

/**
 * @swagger
 * /v1/tarea/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     description: Borra una tarea específica de la base de datos. Se requiere autenticación.
 *     tags: [Tarea]
 *     security:
 *       - bearerAuth: []  # Aplica la seguridad solo a esta operación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: integer
 *           example: 4
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente (sin contenido)
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
tareaRouter.delete("/tarea/:id", authenticateJWT, eliminarTarea);


export default tareaRouter;
