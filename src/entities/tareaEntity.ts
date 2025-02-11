import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UsuarioEntity } from "./usuarioEntity";

@Entity("tareas") // El nombre de la tabla en la base de datos
export class TareaEntity {
  @PrimaryGeneratedColumn()
  id: number; // La clave primaria de la tarea, autogenerada.

  @Column()
  titulo: string; // El título de la tarea.

  @Column("text")
  descripcion: string; // Descripción de la tarea.

  @Column({ default: false })
  estaCompletada: boolean; // Estado de la tarea, si está completada o no.

  // Relación con el usuario, indicando que cada tarea pertenece a un usuario.
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.tareas)
  @JoinColumn() // TypeORM automáticamente se encargará de usar el nombre de la columna 'usuarioId'
  usuario: UsuarioEntity; // Esta propiedad se mapea para cargar los datos del usuario al acceder a la tarea.
}
