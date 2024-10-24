import { Controller, Get, Param, UseGuards, NotFoundException, BadRequestException, Body, Put } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service'; // Importa tu servicio de cuestionarios
import { JwtAuthGuard } from 'src/auth/check-token/jwt-auth.guard'; // Asegúrate de que el guard JWT esté importado correctamente
import { isValidObjectId } from 'mongoose';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Controller('questionnaires')
@UseGuards(JwtAuthGuard) // Asegúrate de usar el guard para la autenticación
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  // Ruta para obtener la lista de cuestionarios (solo nombre e ID)
  @Get()
  async findAll() {
    const questionnaires = await this.questionnaireService.findAll();
    console.log('Cuestionarios enviados:', questionnaires);
    return questionnaires;
  }

  // Ruta para obtener un cuestionario específico por ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    const questionnaire = await this.questionnaireService.findById(id);
  
    if (!questionnaire) {
      throw new NotFoundException('Cuestionario no encontrado');
    }
  
    console.log('Cuestionario encontrado:', questionnaire);
    return questionnaire;
  }

  // Ruta para actualizar un cuestionario
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto
  ) {
    const updatedQuestionnaire = await this.questionnaireService.update(id, updateQuestionnaireDto);
    if (!updatedQuestionnaire) {
      throw new NotFoundException('No se pudo actualizar el cuestionario, no encontrado');
    }
    return updatedQuestionnaire;
  }
}
