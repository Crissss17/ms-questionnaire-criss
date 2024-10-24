import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ required: true })
  questionnaireId: string; // Almacenado como string

  @Prop({ required: true })
  answerText: string; // Almacenado como string
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
