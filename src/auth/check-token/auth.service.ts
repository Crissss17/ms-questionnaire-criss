import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'miSuperSecreto';

  // Servicio para verificar el token (checkToken en MS-2)
  async validateToken(token: string) {
    try {
      console.log('Validating token:', token);
      const decoded = jwt.verify(token, this.jwtSecret);  // Verifica que este secreto sea el mismo que en MS-1
      console.log('Token decoded:', decoded);
      return { valid: true, decoded };
    } catch (error) {
      console.log('Token validation error:', error.message);
      return { valid: false, error: 'Token inválido o expirado' };
    }
  }
  
}
