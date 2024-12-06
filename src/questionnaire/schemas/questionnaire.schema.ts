import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  type: 'Sí/No' | 'Alternativa' | 'Texto';

  @Prop({ required: false })
  answer?: string;
  
  @Prop({ type: Types.ObjectId }) 
  _id: Types.ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Section {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [QuestionSchema], required: true })
  questions: Question[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);

@Schema()
export class Questionnaire extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [SectionSchema], required: true })
  sections: Section[];

  @Prop({ type: String, required: false })
  vehiculo?: string;

  @Prop({ type: [String], default: [] })  
  images: string[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);