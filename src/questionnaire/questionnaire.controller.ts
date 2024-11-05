import { Controller, Get, Post, Param, UseGuards, NotFoundException, Body, Put } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { JwtAuthGuard } from 'src/auth/check-token/jwt-auth.guard';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Controller('questionnaires')
@UseGuards(JwtAuthGuard)
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  async findAll() {
    const questionnaires = await this.questionnaireService.findAll();
    console.log('Cuestionarios enviados:', questionnaires);
    return questionnaires;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const questionnaire = await this.questionnaireService.findById(id);

    if (!questionnaire) {
      throw new NotFoundException('Cuestionario no encontrado');
    }

    console.log('Cuestionario encontrado:', questionnaire);
    return questionnaire;
  }

  @Post()
  async create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

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
