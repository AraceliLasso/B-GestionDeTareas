import { Router } from "express";
import { registrarUsuario, loginUsuarios } from "../controllers/usuarioController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const usuarioRouter: Router = Router();

/**
 * @swagger
 * /api/usuario/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos con los detalles proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: CarlosMendoza12
 *               apellido:
 *                 type: string
 *                 example: Gomez2212
 *               nombreDeUsuario:
 *                 type: string
 *                 example: CarlosM2_221
 *               email:
 *                 type: string
 *                 example: carlos.mendoza@example12.com
 *               password:
 *                 type: string
 *                 example: securePass20252
 *               confirmPassword:
 *                 type: string
 *                 example: securePass20252
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 */
usuarioRouter.post("/usuario/registro", registrarUsuario);

/**
 * @swagger
 * /api/usuario/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     description: Autentica un usuario con sus credenciales y genera un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: carlos.mendoza@example12.com
 *               password:
 *                 type: string
 *                 example: securePass20252
 *     responses:
 *       200:
 *         description: Login exitoso, se devuelve un token de acceso.
 *       401:
 *         description: Credenciales incorrectas.
 */
usuarioRouter.post("/usuario/login", loginUsuarios);

export default usuarioRouter;
