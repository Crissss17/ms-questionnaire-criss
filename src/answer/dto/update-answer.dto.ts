import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto {
    
    questionnaireId?: string; // Almacenado como string
    answerText?: string; // Almacenado como string
  }
