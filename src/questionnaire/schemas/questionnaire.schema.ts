import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ required: false })
  answer?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Questionnaire extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [QuestionSchema], required: true })
  questions: Question[];

  @Prop({ type: String, required: false })
  vehiculo?: string;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
