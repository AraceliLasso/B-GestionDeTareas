import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UsuarioEntity } from "./usuarioEntity";

@Entity("tareas")
export class TareaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column("text")
  descripcion: string;

  @Column({ default: false })
  estaCompletada: boolean;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.tareas)
  @JoinColumn()
  usuario: UsuarioEntity; 
}
