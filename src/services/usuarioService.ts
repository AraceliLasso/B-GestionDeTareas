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

    const nuevoUsuarioCredId: CredencialEntity = await crearUsuarioCredenciales(usuarioData.apellido, usuarioData.password);

    const nuevoUsuario: UsuarioEntity = UsuarioModelo.create(usuarioData);

    await CredentialModel.save(nuevoUsuarioCredId);
    await UsuarioModelo.save(nuevoUsuario);
  

    return {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        credencialesId: nuevoUsuarioCredId.id
    };
}