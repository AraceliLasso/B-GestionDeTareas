import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { actualizarTarea, crearTarea, eliminarTarea, obtenerTareas } from "../controllers/tareaController";

const tareaRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarea:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: El titulo de la tarea
 *         descripcion:
 *           type: string
 *           description: La descripcion de la tarea
 *         estaCompletada:
 *           type: boolean
 *           description: Estado de la tarea
 *       required:
 *         - titulo
 *         - descripcion
 *         - estaCompletada
 *       example:
 *         titulo: "Limpiar la casa"
 *         descripcion: "Barrer, lavar, colgar, descolgar, doblar y guardar ropa, hacer la cama, lustrar muebles y pasar el lampazo"
 *         estaCompletada: false
 */

/**
 * @swagger
 * /api/v1/tarea:
 *   post:
 *     summary: El usuario crea una tarea
 *     tags: 
 *       - Tarea
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */
tareaRouter.post("/tarea", authenticateJWT, crearTarea);

/**
 * @swagger
 * /api/v1/tareas:
 *   get:
 *     summary: Traer todas las tareas del usuario
 *     tags: 
 *       - Tarea
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tareas traidas exitosamente
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tarea'
 */
tareaRouter.get("/tareas", authenticateJWT, obtenerTareas);

/**
 * @swagger
 * /api/v1/tarea/{id}:
 *   put:
 *     summary: El usuario actualiza una tarea
 *     tags:
  *     security:
 *       - BearerAuth: []
 *       - Tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tarea no encontrada
 */
tareaRouter.put("/tarea/:id", authenticateJWT, actualizarTarea);

/**
 * @swagger
 * /api/v1/tarea/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID (requiere autenticación)
 *     tags:
  *     security:
 *       - BearerAuth: []
 *       - Tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       204:
 *         description: Tarea eliminada sin contenido en la respuesta
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tarea no encontrada
 */
tareaRouter.delete("/tarea/:id", authenticateJWT, eliminarTarea);



export default tareaRouter;
