import { AppDataSource } from "../config/data-source";
import { UsuarioAuthRespuestaDto } from "../dtos/usuarioDto";
import { CredencialEntity } from "../entities/credencialEntity";
import bcrypt from 'bcrypt';


export const CredencialModelo = AppDataSource.getRepository(CredencialEntity);

export const crearUsuarioCredenciales = async (nombreDeUsuario: string, password: string): Promise<CredencialEntity> => {
    const credenciales = new CredencialEntity();

    credenciales.nombreDeUsuario = nombreDeUsuario;
    credenciales.password = await bcrypt.hash(password, 10)
  
    await CredencialModelo.save(credenciales);
    return credenciales;
};


export const checkUsuarioCreds = async (nombreDeUsuario: string, password: string): Promise<UsuarioAuthRespuestaDto | null> => {
    // Buscar las credenciales del usuario basándonos en nombreDeUsuario
    const usuarioCredEncontradas: CredencialEntity | null = await CredencialModelo.findOne({
        where: { nombreDeUsuario },
        relations: { usuario: true }
    });
    console.log(usuarioCredEncontradas);

    if (usuarioCredEncontradas) {
        // Comparamos la contraseña con bcrypt para verificarla
        const passwordMatch = await bcrypt.compare(password, usuarioCredEncontradas.password);
        
        if (passwordMatch) {
            // Si la contraseña coincide, retornamos los datos del usuario
            return {
                login: true,
                usuario: {
                    id: usuarioCredEncontradas.usuario.id,
                    nombre: usuarioCredEncontradas.usuario.nombre,
                    apellido: usuarioCredEncontradas.usuario.apellido,
                    email: usuarioCredEncontradas.usuario.email,
                }
            };
        }
    }

    // Si no se encuentran las credenciales o la contraseña es incorrecta, retornamos null
    return null;
};