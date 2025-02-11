import { AppDataSource } from "../config/data-source";
import { UsuarioAuthRespuestaDto } from "../dtos/usuarioDto";
import { CredencialEntity } from "../entities/credencialEntity";
import bcrypt from 'bcrypt';


export const CredentialModel = AppDataSource.getRepository(CredencialEntity);

export const crearUsuarioCredenciales = async (apellido: string, password: string): Promise<CredencialEntity> => {
    const credenciales = new CredencialEntity();
    credenciales.password = await bcrypt.hash(password, 10)
  
    await CredentialModel.save(credenciales);
    return credenciales;
};


export const checkUsuarioCreds = async (nombreDeUsuario: string, password: string): Promise<UsuarioAuthRespuestaDto | null> => {
    const usuarioCredEncontradas: CredencialEntity | null = await CredentialModel.findOne({
        where: { nombreDeUsuario },
        relations: { usuario: true }
    })
    console.log(usuarioCredEncontradas);

    //revisamos si encontramos algo
    if (usuarioCredEncontradas) {
        if (usuarioCredEncontradas.password === password) return {
            login: true,
            usuario: {
                id: usuarioCredEncontradas.usuario.id,
                nombre: usuarioCredEncontradas.usuario.nombre,
                apellido: usuarioCredEncontradas.usuario.apellido,
                email: usuarioCredEncontradas.usuario.email,
               
            }
        }
    }

    return null;
}