import { Request, Response } from "express";
import { UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { crearUsuarioService } from "../services/usuarioService";


// Usuarios
// Endpoint para registrar un usuario: Debe permitir crear un usuario con nombre, correo electrónico y contraseña.
export const registrarUsuario = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, apellido, password } = req.body;
    if (!name || !email || !apellido || !password) {
        return res.status(400).send("Faltan campos requeridos")
    }
    try {
        const nuevoUsuario: UsuarioRespuestaDto = await crearUsuarioService(req.body);
        return res.status(201).send(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear el usuario", error);
        res.status(500).send("Error interno del servidor");
    }
}

// Endpoint para iniciar sesión: Debe recibir las credenciales del usuario y devolver un token JWT si la autenticación es exitosa.
