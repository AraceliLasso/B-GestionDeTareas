import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import jwt from "jsonwebtoken";

const authService = new AuthService();
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(403).json({ message: "Acceso denegado, no se proporcionó un token." });
    return;
  }

  console.log("Secreto JWT:", process.env.JWT_SECRET); // Verificar si la clave secreta está cargada correctamente

  try {
    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next(); // Pasar el control al siguiente middleware/controlador
  } catch (error) {
    console.log("Error al verificar el token:", error); // Depurar el error de verificación
    res.status(401).json({ message: "Token no válido." });
    return;
  }
};
