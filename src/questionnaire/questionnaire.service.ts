import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Questionnaire } from './schemas/questionnaire.schema';
import { CreateQuestionnaireDto} from './dto/create-questionnaire.dto';
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
    try {
      const objectId = new Types.ObjectId(id); // convierte el id a ObjectId
      const questionnaire = await this.questionnaireModel.findById(objectId).exec();
      if (!questionnaire) {
        throw new NotFoundException('Cuestionario no encontrado');
      }
      return questionnaire;
    } catch (error) {
      throw new NotFoundException('ID no válido o cuestionario no encontrado');
    }
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

  // Método para crear un cuestionario
  async create(createQuestionnaireDto: CreateQuestionnaireDto): Promise<Questionnaire> {
    const newQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
    return newQuestionnaire.save();
  }
}
