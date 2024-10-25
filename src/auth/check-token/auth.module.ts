import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './JwtStrategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'miSuperSecreto',
      signOptions: { expiresIn: '20s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],  
})
export class AuthModule {}
