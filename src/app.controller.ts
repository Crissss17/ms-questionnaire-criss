import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckTokenGuard } from './auth/check-token/check-token.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('questionnaire') 
  @UseGuards(CheckTokenGuard)
  getQuestionnaire() {
    return { message: 'Acceso autorizado al cuestionario' };
  }
}
