import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      console.log('Token is missing');
      throw new ForbiddenException('Access token is missing');
    }

    const token = authorizationHeader.split(' ')[1];
    console.log('Authorization header:', authorizationHeader);
    console.log('Extracted token:', token);

    if (!token) {
      throw new ForbiddenException('Access token is missing');
    }

    const isValid = await this.authService.validateToken(token);
    if (!isValid) {
      throw new ForbiddenException('Invalid access token');
    }

    return true;
  }
}

