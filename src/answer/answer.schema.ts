import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Answer extends Document {
  @Prop({ required: true })
  userId: string;  

  @Prop({ required: true })
  questionnaireId: string;

  @Prop({ type: Array, required: true })  
  sections: any[];

  @Prop()
  vehiculo: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
