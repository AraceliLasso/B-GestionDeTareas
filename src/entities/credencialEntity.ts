import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import { UsuarioEntity } from "./usuarioEntity";




@Entity({name:"credencial"})
export class CredencialEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    password: string
    @OneToOne(() => UsuarioEntity, usuario => usuario.credenciales)
    usuario: UsuarioEntity;
}