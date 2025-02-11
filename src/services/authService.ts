import { JWT_SECRET } from '../config/envs';
import { UsuarioEntity } from '../entities/usuarioEntity';

import jwt from 'jsonwebtoken';

export class AuthService {
  public crearToken(usuario: UsuarioEntity): string {
    const payload = {
      id: usuario.id,
      email: usuario.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  public verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Token no válido');
    }
  }
}

