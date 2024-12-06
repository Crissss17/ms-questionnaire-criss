import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto {
    
    questionnaireId?: string; 
    answerText?: string; 
  }