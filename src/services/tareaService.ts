import { AppDataSource } from "../config/data-source";
import { TareaEntity } from "../entities/tareaEntity"; // Importar tu fuente de datos
import { UsuarioEntity } from "../entities/usuarioEntity";

export class TareaService {
  private tareaRepository = AppDataSource.getRepository(TareaEntity);
  private usuarioRepository = AppDataSource.getRepository(UsuarioEntity);

  // Obtener todas las tareas del usuario autenticado
  async obtenerTareas(usuarioId: number) {
    return this.tareaRepository.find({
      where: { usuario: { id: usuarioId } },
    });
  }

  // Crear una nueva tarea
  async crearTarea(titulo: string, descripcion: string, usuarioId: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    const nuevaTarea = new TareaEntity();
    nuevaTarea.titulo = titulo;
    nuevaTarea.descripcion = descripcion;
    nuevaTarea.usuario = usuario;

    return this.tareaRepository.save(nuevaTarea);
  }

  // Actualizar una tarea existente
  async actualizarTarea(id: number, titulo?: string, descripcion?: string, estaCompletada?: boolean) {
    const tarea = await this.tareaRepository.findOne({ where: { id } });
    if (!tarea) {
      throw new Error("Tarea no encontrada");
    }

    tarea.titulo = titulo || tarea.titulo;
    tarea.descripcion = descripcion || tarea.descripcion;
    tarea.estaCompletada = estaCompletada ?? tarea.estaCompletada;

    return this.tareaRepository.save(tarea);
  }

  // Eliminar una tarea
  async eliminarTarea(id: number) {
    const tarea = await this.tareaRepository.findOne({ where: { id } });
    if (!tarea) {
      throw new Error("Tarea no encontrada");
    }

    return this.tareaRepository.remove(tarea);
  }
}
