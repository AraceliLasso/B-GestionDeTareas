import { Router } from "express";
import { registrarUsuario, loginUsuarios } from "../controllers/usuarioController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const usuarioRouter: Router = Router();


usuarioRouter.post("/usuario/registro", registrarUsuario);

usuarioRouter.post("/usuario/login", loginUsuarios);

export default usuarioRouter;
