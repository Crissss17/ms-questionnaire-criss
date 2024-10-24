import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from './schemas/questionnaire.schema';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
  ) {}

  // Encuentra todos los cuestionarios
  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireModel.find().populate('questions').exec();
  }
  
  // Método para buscar un cuestionario por su ID
  async findById(id: string): Promise<Questionnaire> {
    return this.questionnaireModel.findById(id).exec();
  }
}
