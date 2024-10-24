import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from './schemas/questionnaire.schema';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
  ) {}

  // Encuentra todos los cuestionarios
  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireModel.find().exec();
  }

  // Método para buscar un cuestionario por su ID
  async findById(id: string): Promise<Questionnaire> {
    const questionnaire = await this.questionnaireModel.findById(id).exec();
    if (!questionnaire) {
      throw new NotFoundException('Cuestionario no encontrado');
    }
    return questionnaire;
  }

  // Método para actualizar un cuestionario por su ID
  async update(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto): Promise<Questionnaire> {
    const updatedQuestionnaire = await this.questionnaireModel
      .findByIdAndUpdate(id, updateQuestionnaireDto, { new: true })
      .exec();
      
    if (!updatedQuestionnaire) {
      throw new NotFoundException('No se pudo actualizar el cuestionario');
    }
    return updatedQuestionnaire;
  }
}
