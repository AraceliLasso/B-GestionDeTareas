import { Router } from "express";
import { loginUsuarios, registrarUsuario } from "../controllers/usuarioController";

const usuarioRouter: Router = Router();

// POST /users/register => Registro de un nuevo usuario.
usuarioRouter.post("/usuario/registro", registrarUsuario);
usuarioRouter.post("/usuario/login", loginUsuarios);

export default usuarioRouter;
