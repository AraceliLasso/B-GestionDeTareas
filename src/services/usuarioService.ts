import { AppDataSource } from "../config/data-source";
import UsuarioDto, { UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { CredencialEntity } from "../entities/credencialEntity";
import { UsuarioEntity } from "../entities/usuarioEntity";
import { crearUsuarioCredenciales, CredentialModel } from "./credencialesService";
import * as jwt from 'jsonwebtoken';


//lo exporto para poder utilizar en toda la aplicacion
export const UsuarioModelo = AppDataSource.getRepository(UsuarioEntity);

// export const generateJwtToken = async (usuario: Partial<UsuarioEntity>): Promise<string> => {
//     const payload = {
//         user: {
//             sub: usuario.id,
//             nombre: usuario.nombre,
//             email: usuario.email,

//         }
//     };
//     const secretKey = process.env.JWT_SECRET || 'default_secret_key';
//     return jwt.sign(payload, secretKey, {
//         expiresIn: '1h',
//     });
// }

// export const crearToken = async (usuario: UsuarioEntity) => {
//     const payload = {
//         id: usuario.id,
//         email: usuario.email,
//     };
//     return this.jwtService.signAsync(payload)
// }

export const crearUsuarioService = async (usuarioData: UsuarioDto): Promise<UsuarioRespuestaDto> => {
    // Verificar que las contraseñas coincidan
    if (usuarioData.password !== usuarioData.confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
    }

    // Crear las credenciales del usuario
    const nuevoUsuarioCredId: CredencialEntity = await crearUsuarioCredenciales(usuarioData.apellido, usuarioData.password);

    // Crear el nuevo usuario
    const nuevoUsuario: UsuarioEntity = UsuarioModelo.create({
        nombre: usuarioData.nombre,
        email: usuarioData.email,
        // Aquí asignamos la entidad completa de credenciales
        credenciales: nuevoUsuarioCredId,
    });

    // Relacionar el usuario con sus credenciales
    nuevoUsuarioCredId.usuario = nuevoUsuario;

    // Guardar usuario y credenciales
    await UsuarioModelo.save(nuevoUsuario);
    await CredentialModel.save(nuevoUsuarioCredId);

    // Devolver el DTO de respuesta
    return {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        apellido:nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        credencialesId: nuevoUsuarioCredId.id,  // Aquí retornamos solo el id si es necesario
    };
}

