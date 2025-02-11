import { compare } from "bcrypt";
import { AppDataSource } from "../config/data-source";
import UsuarioDto, { SignInAuthDto, UsuarioAuthRespuestaDto, UsuarioRespuestaDto } from "../dtos/usuarioDto";
import { CredencialEntity } from "../entities/credencialEntity";
import { UsuarioEntity } from "../entities/usuarioEntity";
import { checkUsuarioCreds, crearUsuarioCredenciales, CredencialModelo } from "./credencialesService";
import * as jwt from 'jsonwebtoken';
import { AuthService } from './authService';

//lo exporto para poder utilizar en toda la aplicacion
export const UsuarioModelo = AppDataSource.getRepository(UsuarioEntity);
const authService = new AuthService();


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
        const nuevoUsuarioCredId: CredencialEntity = await crearUsuarioCredenciales(usuarioData.nombreDeUsuario, usuarioData.password);

        // Crear el usuario y asociar las credenciales al usuario
        const nuevoUsuario: UsuarioEntity = UsuarioModelo.create({
            ...usuarioData,
            credenciales: nuevoUsuarioCredId, // Asignamos el objeto completo de CredencialEntity
        });

        // Guardar el usuario y las credenciales
        await UsuarioModelo.save(nuevoUsuario);
        await CredencialModelo.save(nuevoUsuarioCredId);

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


export const signIn = async (signInUsuario: SignInAuthDto) => {
    const usuario = await findByEmail(signInUsuario.email);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }
    const isPasswordMatchin = await compare(signInUsuario.password, usuario.credenciales.password);
    if (!isPasswordMatchin) {
        throw new Error("Credenciales erroneas");
    }
    const token = await authService.crearToken(usuario);
    return { token };

}

export const findByEmail = (email: string) => {
    return UsuarioModelo.findOne({ where: { email: email } });
}