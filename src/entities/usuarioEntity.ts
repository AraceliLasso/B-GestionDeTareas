
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { TareaEntity } from "./tareaEntity";
import { CredencialEntity } from "./credencialEntity";


@Entity({ name: "usuarios" })

export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    nombre: string

    @Column({ length: 100 })
    apellido: string;

    @Column({ length: 100 })
    email: string

    @OneToMany(() => TareaEntity, (tarea) => tarea.usuario)
    tareas: TareaEntity[];

    @OneToOne(() => CredencialEntity, credencial => credencial.usuario)
    @JoinColumn() // Esto indica que 'credencialesId' es la clave foránea en la tabla Usuario
    credenciales: CredencialEntity;
  

}
