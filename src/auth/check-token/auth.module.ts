import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './JwtStrategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'miSuperSecreto',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],  // Exporta JwtModule y AuthService
})
export class AuthModule {}
