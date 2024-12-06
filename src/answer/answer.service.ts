import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswerDocument } from './answer.schema';
import { Questionnaire } from 'src/questionnaire/schemas/questionnaire.schema';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(AnswerDocument.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<AnswerDocument> {
    console.log('Validando datos en el backend:', JSON.stringify(createAnswerDto, null, 2));
  
    if (!createAnswerDto.sections || createAnswerDto.sections.length === 0) {
      throw new BadRequestException('El cuestionario debe tener al menos una sección.');
    }
  
    createAnswerDto.sections.forEach((section) => {
      if (!section.name || !section.questions || section.questions.length === 0) {
        throw new BadRequestException(`La sección "${section.name}" debe tener preguntas.`);
      }
  
      section.questions.forEach((question) => {
        if (!question.questionId || !question.response) {
          throw new BadRequestException('Cada pregunta debe incluir un questionId y una response.');
        }
      });
    });
  
    const newAnswer = new this.answerModel(createAnswerDto);
    return newAnswer.save();
  }
  
  async findById(id: string): Promise<AnswerDocument> {
    const answer = await this.answerModel.findById(id).exec();
    if (!answer) {
      throw new NotFoundException('Respuesta no encontrada');
    }
    return answer;
  }

  async addImages(id: string, imagePaths: string[]): Promise<AnswerDocument> {
    const answer = await this.answerModel.findById(id);
    if (!answer) {
      throw new NotFoundException('Respuesta no encontrada');
    }
  
    answer.images = [...answer.images, ...imagePaths];
    return answer.save();
  }

  async findByUserId(userId: string): Promise<any[]> {
    return this.answerModel
      .find({ userId })
      .populate({
        path: 'questionnaireId', 
        select: 'name', 
      })
      .sort({ createdAt: -1 }) 
      .exec();
  }
  
  async findByIdWithDetails(id: string): Promise<any> {
    const answer = await this.answerModel
      .findById(id)
      .populate({
        path: 'questionnaireId',
        select: 'name sections', 
      })
      .exec();
  
    if (!answer) {
      throw new NotFoundException('Respuesta no encontrada');
    }
  
    const questionnaire = answer.questionnaireId as any;
  
    return {
      ...answer.toObject(),
      questionnaireName: questionnaire.name, 
      sections: questionnaire.sections.map((section: any) => ({
        name: section.name,
        questions: section.questions.map((question: any) => ({
          text: question.text,
          type: question.type,
          answer: answer.sections
            .find((ansSection: any) => ansSection.name === section.name)
            ?.questions.find((q: any) => q.questionId.toString() === question._id.toString())?.response || 'Sin respuesta',
        })),
      })),
    };
  }


  async createAnswers(createAnswerDto: CreateAnswerDto): Promise<AnswerDocument> {
    console.log('Datos recibidos en el backend:', JSON.stringify(createAnswerDto, null, 2));
  
    // Validar las secciones y preguntas
    createAnswerDto.sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (!question.questionId || typeof question.questionId !== 'string') {
          throw new BadRequestException(
            `La pregunta "${JSON.stringify(question)}" no tiene un questionId válido.`
          );
        }
      });
    });
  
    const newAnswer = new this.answerModel({
      ...createAnswerDto,
      location: createAnswerDto.location || null, 
    });
  
    return newAnswer.save();
  }
  
}
