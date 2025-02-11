import { Request, Response } from "express";
import { UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { crearUsuarioService } from "../services/usuarioService";


// Usuarios
// Endpoint para registrar un usuario: Debe permitir crear un usuario con nombre, correo electrónico y contraseña.
export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, apellido, password, confirmPassword } = req.body;

    // Validar que no falten campos obligatorios
    if (!nombre || !email || !apellido || !password || !confirmPassword) {
        res.status(400).send("Faltan campos obligatorios");
        return;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        res.status(400).send("Las contraseñas no coinciden");
        return;
    }

    try {
        const nuevoUsuario: UsuarioRespuestaDto = await crearUsuarioService(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).send("Error Interno del Servidor");
    }
};


// Endpoint para iniciar sesión: Debe recibir las credenciales del usuario y devolver un token JWT si la autenticación es exitosa.
