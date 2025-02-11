import { Request, Response } from "express";
import { TareaService } from "../services/tareaService";

const tareaService = new TareaService();

// Endpoint para obtener todas las tareas del usuario autenticado.
export const obtenerTareas = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.user.id; // Obtener el id del usuario autenticado
        const tareas = await tareaService.obtenerTareas(usuarioId);
        res.json(tareas); // Aquí se envía la respuesta, no es necesario usar `return`
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Endpoint para crear una nueva tarea con un título y una descripción.
export const crearTarea = async (req: Request, res: Response) => {
    try {
        const { titulo, descripcion } = req.body;
        const usuarioId = req.user.id; // Obtener el id del usuario autenticado

        const tareaGuardada = await tareaService.crearTarea(titulo, descripcion, usuarioId);
        res.status(201).json(tareaGuardada); // Usamos `status(201)` para indicar que la tarea se ha creado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Endpoint para actualizar una tarea existente (permitiendo modificar título, descripción y marcarla como completada).
export const actualizarTarea = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("ID recibido:", id);

        const { titulo, descripcion, estaCompletada } = req.body;
        console.log("Cuerpo de la solicitud:", { titulo, descripcion, estaCompletada });

        const tareaActualizada = await tareaService.actualizarTarea(Number(id), titulo, descripcion, estaCompletada);
        console.log("Tarea actualizada:", tareaActualizada);

        res.json(tareaActualizada);
    } catch (error) {
        console.error("Error al actualizar la tarea:", error); 
        res.status(500).json({ message: error.message });
    }
};

// Endpoint para eliminar una tarea.
export const eliminarTarea = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("ID recibido en la solicitud:", id);
        
        await tareaService.eliminarTarea(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
