import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerDocument } from './schemas/answer.schema';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<AnswerDocument>) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const createdAnswer = new this.answerModel(createAnswerDto);
    return createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  async findOne(id: string): Promise<Answer> {
    const answer = await this.answerModel.findById(id).exec();
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return answer;
  }

  // Cambia CreateAnswerDto por UpdateAnswerDto aquí
  async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const updatedAnswer = await this.answerModel.findByIdAndUpdate(id, updateAnswerDto, { new: true }).exec();
    if (!updatedAnswer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return updatedAnswer;
  }

  async remove(id: string): Promise<Answer> {
    const deletedAnswer = await this.answerModel.findByIdAndDelete(id).exec();
    if (!deletedAnswer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return deletedAnswer;
  }
}
