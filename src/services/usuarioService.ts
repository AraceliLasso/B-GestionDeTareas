import { AppDataSource } from "../config/data-source";
import UsuarioDto, { UsuarioAuthRespuestaDto, UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { CredencialEntity } from "../entities/credencialEntity";
import { UsuarioEntity } from "../entities/usuarioEntity";
import { checkUsuarioCreds, crearUsuarioCredenciales, CredentialModel } from "./credencialesService";
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
    try {
        // Validar si las contraseñas coinciden
        if (usuarioData.password !== usuarioData.confirmPassword) {
            throw new Error("Las contraseñas no coinciden");
        }

        // Verificar si el email ya está en uso
        const usuarioExistente = await UsuarioModelo.findOne({ where: { email: usuarioData.email } });
        if (usuarioExistente) {
            throw new Error("El email ya está registrado");
        }

        // Crear las credenciales
        const nuevoUsuarioCredId: CredencialEntity = await crearUsuarioCredenciales(usuarioData.apellido, usuarioData.password);

        // Crear el usuario y asociar las credenciales al usuario
        const nuevoUsuario: UsuarioEntity = UsuarioModelo.create({
            ...usuarioData,
            credenciales: nuevoUsuarioCredId, // Asignamos el objeto completo de CredencialEntity
        });

        // Guardar el usuario y las credenciales
        await UsuarioModelo.save(nuevoUsuario);
        await CredentialModel.save(nuevoUsuarioCredId);

        // Devolver la respuesta con la estructura esperada
        return {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            email: nuevoUsuario.email,
            credencialesId: nuevoUsuarioCredId.id, // El id de las credenciales también lo incluimos
        };
    } catch (error) {
        throw new Error(error.message || "Error al crear el usuario");
    }
};

export const loginUsuarioService = async (nombreDeUsuario: string, password: string):Promise<UsuarioAuthRespuestaDto | null>=>{
    //validar las credenciales
    //encontrar al user
    //empaquetar la respuesta
    return await checkUsuarioCreds(nombreDeUsuario, password);

}
