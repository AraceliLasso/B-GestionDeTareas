export interface UsuarioRespuestaDto {
    id:number,
    nombre: string,
    email: string,
    credencialesId:number;
}
interface UsuarioDto {
    nombre: string,
    email: string,
    apellido: string;
    password: string;
}
export default UsuarioDto;