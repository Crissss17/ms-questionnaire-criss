import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AnswersService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';

@Controller('answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly questionnaireService: QuestionnaireService, 
  ) {}

  @Post()
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    console.log('Datos recibidos en el backend:', JSON.stringify(createAnswerDto, null, 2));
    return this.answersService.create(createAnswerDto);
  }


  @Get(':id')
  async getAnswer(@Param('id') id: string) {
    return this.answersService.findById(id);
  }

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('files', 10, { dest: './uploads/answers' })) 
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido archivos.');
    }

    const imagePaths = files.map((file) => file.path); 
    return this.answersService.addImages(id, imagePaths);
  }

  @Get('user-history/:userId')
  async getUserAnswers(@Param('userId') userId: string) {
    return this.answersService.findByUserId(userId);
  }

  @Get('details/:id') 
  async getAnswerWithDetails(@Param('id') id: string) {
    return this.answersService.findByIdWithDetails(id);
  }

  @Get('questionnaire/:id') 
  async getQuestionnaire(@Param('id') id: string) {
    const questionnaire = await this.questionnaireService.findById(id);
    if (!questionnaire) {
      throw new NotFoundException('Cuestionario no encontrado');
    }
    return questionnaire; 
  }
}
