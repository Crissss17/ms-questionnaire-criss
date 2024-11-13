import { Body, Controller, Get, InternalServerErrorException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { JwtAuthGuard } from 'src/auth/check-token/jwt-auth.guard';
import { Answer } from './answer.schema';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    console.log("Datos recibidos en el controlador:", createAnswerDto);  // Verifica los datos que se están enviando
    try {
      return await this.answerService.createAnswer(createAnswerDto);
    } catch (error) {
      console.error("Error al guardar en 'answers':", error);  // Log detallado del error
      throw new InternalServerErrorException('No se pudo guardar la respuesta en la base de datos');
    }
  }

  @Get('user-history')
  async getUserHistory(@Query('userId') userId: string) {
    try {
      console.log("userId recibido:", userId);
      return await this.answerService.getUserHistory(userId);
    } catch (error) {
      console.error("Error en getUserHistory:", error);
      throw new InternalServerErrorException("No se pudo obtener el historial de respuestas.");
    }
  }

  @Get(':id')
  async findAnswerById(@Param('id') id: string) {
    try {
      return await this.answerService.findAnswerById(id);
    } catch (error) {
      console.error("Error en findAnswerById:", error);
      throw new InternalServerErrorException("No se pudo obtener la respuesta.");
    }
  }
}
