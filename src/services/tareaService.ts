import { AppDataSource } from "../config/data-source";
import { TareaEntity } from "../entities/tareaEntity"; // Importar tu fuente de datos
import { UsuarioEntity } from "../entities/usuarioEntity";

export class TareaService {
  private tareaRepository = AppDataSource.getRepository(TareaEntity);
  private usuarioRepository = AppDataSource.getRepository(UsuarioEntity);

  async obtenerTareas(usuarioId: number) {
    return this.tareaRepository.find({
      where: { usuario: { id: usuarioId } },
    });
  }

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

  async actualizarTarea(id: number, titulo?: string, descripcion?: string, estaCompletada?: boolean) {
    const tarea = await this.tareaRepository.findOne({ where: { id } });  // Aquí usamos el id como number
    if (!tarea) {
      throw new Error("Tarea no encontrada");
    }
  
    tarea.titulo = titulo || tarea.titulo;
    tarea.descripcion = descripcion || tarea.descripcion;
    tarea.estaCompletada = estaCompletada ?? tarea.estaCompletada;
  
    return this.tareaRepository.save(tarea);
  }
  
  


  async eliminarTarea(id: number) {
    console.log("ID recibido en el servicio:", id);
    const tarea = await this.tareaRepository.findOne({ where: { id } });
    console.log("ID recibido en la solicitud:", id);
    if (!tarea) {
      throw new Error("Tarea no encontrada");
    }
    console.log("Tarea encontrada:", tarea);
    return this.tareaRepository.remove(tarea);
  }
}
