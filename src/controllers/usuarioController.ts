import { Request, Response } from "express";
import { SignInAuthDto, UsuarioAuthRespuestaDto, UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { crearUsuarioService, signIn } from "../services/usuarioService";
import { validate } from "class-validator";


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
export const loginUsuarios = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string, password: string } = req.body;
  const signInDto = new SignInAuthDto({ email, password });

  const errors = await validate(signInDto);
  if (errors.length > 0) {
      res.status(400).json({
          message: 'Datos inválidos',
          errors: errors
      });
      return; // Aquí terminamos la función sin retornar nada más
  }

  // Continuar con la autenticación si no hay errores
  try {
      const result = await signIn({ email, password });
      res.json(result); // Respuesta sin retornar nada
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};