import { Request, Response } from "express";
import { SignInAuthDto, UsuarioAuthRespuestaDto, UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { crearUsuarioService, signIn } from "../services/usuarioService";


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
  // Desestructuramos el cuerpo de la solicitud (que se espera que sea un objeto conforme a SignInAuthDto)
  const { email, password }: { email: string, password: string } = req.body;
  console.log("Email:", email, "Password:", password);    try {
      
      if (!email || !password) {
        res.status(400).send("Email y password son requeridos.");
        return;
      }
  
      // Llamamos al servicio de inicio de sesión
      const result = await signIn({ email, password });
  
      // Si todo va bien, devolvemos el token
      res.json(result);  // Aquí ya no es necesario un return
    } catch (error) {
      // En caso de error, respondemos con el error
      res.status(400).json({ message: error.message });
    }
  };