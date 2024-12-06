import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')  
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    const isValid = await this.authService.validateToken(token);
    if (isValid) {
      return { valid: true };  
    } else {
      return { valid: false }; 
    }
  }
}
