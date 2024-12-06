import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Questionnaire } from './schemas/questionnaire.schema';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
  ) {}

  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireModel.find().exec();
  }

  async findById(id: string): Promise<Questionnaire> {
    const questionnaire = await this.questionnaireModel.findById(id).exec();
    if (!questionnaire) {
      throw new NotFoundException('Cuestionario no encontrado');
    }
    return questionnaire;
  }

  async create(createQuestionnaireDto: CreateQuestionnaireDto): Promise<Questionnaire> {
    try {
      createQuestionnaireDto.sections.forEach((section) => {
        section.questions.forEach((question) => {
          if (!question._id) {
            question._id = new Types.ObjectId().toString(); // Generar nuevo ObjectId si falta
          }
        });
      });
  
      console.log('DTO preparado para guardar:', JSON.stringify(createQuestionnaireDto, null, 2));
  
     
      const newQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
      return await newQuestionnaire.save();
    } catch (error) {
      console.error('Error al guardar el cuestionario:', error.message);
      throw new InternalServerErrorException('Error al crear el cuestionario');
    }
  }
  
  async update(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto): Promise<Questionnaire> {
    try {
      const updatedQuestionnaire = await this.questionnaireModel.findByIdAndUpdate(id, updateQuestionnaireDto, {
        new: true,
        runValidators: true,
      }).exec();
      if (!updatedQuestionnaire) {
        throw new NotFoundException('Cuestionario no encontrado');
      }
      return updatedQuestionnaire;
    } catch (error) {
      console.error('Error al actualizar el cuestionario:', error.message);
      throw new InternalServerErrorException('Error al actualizar el cuestionario');
    }
  }  
}
