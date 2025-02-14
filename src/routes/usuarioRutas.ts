import { Router } from "express";
import { registrarUsuario, loginUsuarios } from "../controllers/usuarioController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const usuarioRouter: Router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioEntity:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: El nombre del usuario
 *         apellido:
 *           type: string
 *           description: El apellido del usuario
 *         nombreDeUsuario:
 *           type: string
 *           description: El sobrenombre del usuario
 *         email:
 *           type: string
 *           description: El mail del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: La contraseña del usuario
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: Confirmación de la contraseña
 *       required:
 *         - nombre
 *         - apellido
 *         - nombreDeUsuario
 *         - email
 *         - password
 *         - confirmPassword
 *       example:
 *         nombre: "Juan"
 *         apellido: "Perez"
 *         nombreDeUsuario: "ElJuaniPerez"
 *         email: "juanPeperez@gmail.com"
 *         password: "12345*"
 *         confirmPassword: "12345*"
 */

/**
 * @swagger
 * /api/usuarios/registro:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: 
 *       - UsuarioEntity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioEntity'
 *      responses:
 *      201:
 *          description: Nuevo usuario creado
 */
usuarioRouter.post("/usuario/registro", registrarUsuario);

usuarioRouter.post("/usuario/login", loginUsuarios);

export default usuarioRouter;
