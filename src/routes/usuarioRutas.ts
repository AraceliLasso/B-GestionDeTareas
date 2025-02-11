import { Router } from "express";
import { loginUsuarios, registrarUsuario } from "../controllers/usuarioController";

const usuarioRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /api/usuario/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario en la plataforma. Se requiere autenticación.
 *     tags:
 *       - Usuario
 *     requestBody:
 *       description: Datos necesarios para registrar un usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Carlos"
 *               apellido:
 *                 type: string
 *                 example: "Mendoza"
 *               nombreDeUsuario:
 *                 type: string
 *                 example: "CarlosM_221"
 *               email:
 *                 type: string
 *                 example: "carlos.mendoza@example1.com"
 *               password:
 *                 type: string
 *                 example: "securePass2025"
 *               confirmPassword:
 *                 type: string
 *                 example: "securePass2025"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 */
usuarioRouter.post("/usuario/registro", registrarUsuario);

/**
 * @swagger
 * /api/usuario/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     description: Permite a un usuario iniciar sesión proporcionando su email y contraseña. Se requiere autenticación.
 *     tags:
 *       - Usuario
 *     requestBody:
 *       description: Credenciales del usuario para iniciar sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "carlos.mendoza@example.com"
 *               password:
 *                 type: string
 *                 example: "securePass2025"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, retorna un token de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SXk8eDwA88lqZiXKbDeG2VVlbVupzOYjZyC8_cAeGGg"
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 */
usuarioRouter.post("/usuario/login", loginUsuarios);

export default usuarioRouter;
