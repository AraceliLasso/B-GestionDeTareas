
export interface  UsuarioAuthRespuestaDto{
    login: boolean;
    usuario: {
        id: number;
        nombre: string;
        apellido:string,
        email: string;
    };
    token?: string;
}

export interface UsuarioRespuestaDto {
    id:number,
    nombre: string,
    apellido:string,
    email: string,
    credencialesId:number;
}
interface UsuarioDto {
    nombre: string;
    email: string;
    apellido: string;
    nombreDeUsuario:string;
    password: string;
    confirmPassword: string;
}
export default UsuarioDto;