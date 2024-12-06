import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  async createQuestionnaire(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    try {
      return await this.questionnaireService.create(createQuestionnaireDto);
    } catch (error) {
      console.error('Error al crear el cuestionario:', error.message);
      throw new HttpException(
        'Hubo un problema al crear el cuestionario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    return this.questionnaireService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const questionnaire = await this.questionnaireService.findById(id);
    if (!questionnaire) {
      throw new NotFoundException('Cuestionario no encontrado');
    }
    return questionnaire;
  }

  @Put(':id')
  async updateQuestionnaire(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ) {
    try {
      const updatedQuestionnaire = await this.questionnaireService.update(id, updateQuestionnaireDto);
      if (!updatedQuestionnaire) {
        throw new HttpException('Cuestionario no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedQuestionnaire;
    } catch (error) {
      console.error('Error al actualizar el cuestionario:', error.message);
      throw new HttpException(
        'Hubo un problema al actualizar el cuestionario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
