import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import jwt from "jsonwebtoken";

const authService = new AuthService();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {  // Nota: No devuelve Response
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(403).json({ message: "Acceso denegado, no se proporcionó un token." });
    return;
  }

  try {
    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next(); // Pasar el control al siguiente middleware/controlador
  } catch (error) {
    res.status(401).json({ message: "Token no válido." });
    return;
  }
};
