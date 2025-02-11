// export interface UserAuthResponseDto{
//     login: boolean;
//     user:{
//         id:number;
//         nombre:string;
//         email:string;
//     }
// }

export interface UserAuthResponseDto {
    login: boolean;
    user: {
        id: number;
        nombre: string;
        email: string;
    };
    token?: string;
}

export interface UsuarioRespuestaDto {
    id:number,
    nombre: string,
    email: string,
    credencialesId:number;
}
interface UsuarioDto {
    nombre: string;
    email: string;
    apellido: string;
    password: string;
    confirmPassword: string; // Confirmación de la contraseña
}
export default UsuarioDto;
