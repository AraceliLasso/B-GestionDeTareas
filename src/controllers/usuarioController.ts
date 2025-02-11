import { Request, Response } from "express";
import { UsuarioAuthRespuestaDto, UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { crearUsuarioService, loginUsuarioService } from "../services/usuarioService";


// Usuarios
// Endpoint para registrar un usuario: Debe permitir crear un usuario con nombre, correo electrónico y contraseña.
export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, apellido, nombreDeUsuario, password, confirmPassword } = req.body;

    if (!nombre || !email || !nombreDeUsuario ||!apellido || !password || !confirmPassword) {
        res.status(400).send("Faltan campos obligatorios");
        return;
    }

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


// Endpoint para iniciar sesión:
// Debe recibir las credenciales del usuario y devolver un token JWT
//  la autenticación es exitosa.
export const loginUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombreDeUsuario, password } = req.body;
        if (!nombreDeUsuario || !password) {
            res.status(400).send("Faltan campos obligatorios");
            return;
        }
        const usuarioVerificado: UsuarioAuthRespuestaDto | null = await loginUsuarioService(nombreDeUsuario, password);
        if (usuarioVerificado) {
            res.status(400).send(usuarioVerificado);
            return;
        } res.status(400).send("Login falló");
        return;
    } catch (error) {
        console.error("Error creando usuario: ", error);
        res.status(500).send("Error interno de server")
    }
}
