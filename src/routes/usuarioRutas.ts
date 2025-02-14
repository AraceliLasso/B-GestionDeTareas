import { Router } from "express";
import { registrarUsuario, loginUsuarios } from "../controllers/usuarioController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const usuarioRouter: Router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroUsuario:
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
 * /api/usuario/registro:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: 
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroUsuario'
 *     responses:
 *       201:
 *         description: Nuevo usuario creado exitosamente
 */

usuarioRouter.post("/usuario/registro", registrarUsuario);

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUsuario:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: El mail del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: La contraseña del usuario
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: "juanPeperez@gmail.com"
 *         password: "12345*"
 */

/**
 * @swagger
 * /api/usuario/login:
 *   post:
 *     summary: El usuario ingresa a su cuenta
 *     tags: 
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUsuario'
 *     responses:
 *       201:
 *         description: Login exitoso
 */

usuarioRouter.post("/usuario/login", loginUsuarios);

export default usuarioRouter;
