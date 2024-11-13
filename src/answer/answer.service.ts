import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from './answer.schema';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private readonly answerModel: Model<Answer>) {}

  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    try {
      const newAnswer = new this.answerModel(createAnswerDto);
      return await newAnswer.save();
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      throw new InternalServerErrorException('No se pudo guardar la respuesta en la base de datos');
    }
  }

  async getUserHistory(userId: string): Promise<Answer[]> {
    console.log("Buscando respuestas para userId:", userId);
    return this.answerModel.find({ userId }).exec();
  }

  async findAnswerById(id: string): Promise<Answer> {
    return this.answerModel.findById(id).exec();
  }
}
