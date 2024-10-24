import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { AnswersService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  // Crear una respuesta
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  // Obtener todas las respuestas
  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  // Obtener una respuesta por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const answer = await this.answersService.findOne(id);
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return answer;
  }

  // Actualizar una respuesta por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  // Eliminar una respuesta por ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const answer = await this.answersService.remove(id);
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return { message: `Answer with ID ${id} removed successfully` };
  }
}
