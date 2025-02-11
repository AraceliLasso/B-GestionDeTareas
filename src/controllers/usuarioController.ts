import { Request, Response } from "express";
import { UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { crearUsuarioService } from "../services/usuarioService";


// Usuarios
// Endpoint para registrar un usuario: Debe permitir crear un usuario con nombre, correo electrónico y contraseña.
export const registrarUsuario = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    if (!name || !email ) {
        return res.status(400).send("Missing required fields")
    }
    try {
        const newUser: UsuarioRespuestaDto = await crearUsuarioService(req.body)
        return res.status(201).send(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Endpoint para iniciar sesión: Debe recibir las credenciales del usuario y devolver un token JWT si la autenticación es exitosa.
