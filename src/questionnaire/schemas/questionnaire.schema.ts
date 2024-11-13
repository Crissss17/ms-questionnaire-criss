import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question {
  @Prop({ required: true })  // Asegúrate de que este campo sea obligatorio
  text: string;

  @Prop({ required: true })  // Asegúrate de que este campo sea obligatorio
  type: 'Sí/No' | 'Alternativa' | 'Texto'; // El tipo puede ser una enumeración de valores permitidos

  @Prop({ required: false })  // Este campo es opcional
  answer?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Section {
  @Prop({ required: true })  // Asegúrate de que este campo sea obligatorio
  name: string;

  @Prop({ type: [QuestionSchema], required: true })  // Asegúrate de que este campo sea obligatorio
  questions: Question[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);

@Schema()
export class Questionnaire extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [SectionSchema], required: true })  // Cambiado para incluir secciones
  sections: Section[];

  @Prop({ type: String, required: false })
  vehiculo?: string;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
