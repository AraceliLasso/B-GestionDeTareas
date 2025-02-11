import { AppDataSource } from "../config/data-source";
import UsuarioDto, { UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { CredencialEntity } from "../entities/credencialEntity";
import { UsuarioEntity } from "../entities/usuarioEntity";
import { crearUsuarioCredenciales, CredentialModel } from "./credencialesService";



//lo exporto para poder utilizar en toda la aplicacion
export const UserModel = AppDataSource.getRepository(UsuarioEntity);

export const crearUsuarioService = async (userData: UsuarioDto): Promise<UsuarioRespuestaDto> => {
    //servicio para crear IDs
    const newUserCredsId: CredencialEntity= await crearUsuarioCredenciales(userData.apellido, userData.password);
    //crear un nuevo usuario
    const newUser: UsuarioEntity = UserModel.create(userData);
    //hacer las relaciones:
    newUser.credencialesId = newUserCredsId;
    newUserCredsId.usuario = newUser;
    await UserModel.save(newUser);
    await CredentialModel.save(newUserCredsId);
    ///servicio para crear creds
    //servicio para mandar la credencial creada y en base de eso creo el usuario
    return {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        credencialesId: newUser.credencialesId.id
    };
}