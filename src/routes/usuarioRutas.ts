import { Router } from "express";
import { registrarUsuario } from "../controllers/usuarioController";

const usuarioRouter: Router = Router();

// POST /users/register => Registro de un nuevo usuario.
usuarioRouter.post("/usuario/registro", registrarUsuario);


export default usuarioRouter;