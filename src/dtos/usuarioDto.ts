import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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

export class SignInAuthDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    constructor(partial:Partial<SignInAuthDto>){
        Object.assign(this, partial);
    }
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