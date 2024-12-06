import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class QuestionAnswer {
  @Prop({ required: true, type: String })
  questionId: string;

  @Prop({ required: true })
  response: string;

  @Prop({ type: Types.ObjectId }) 
  _id: Types.ObjectId;
}


export const QuestionAnswerSchema = SchemaFactory.createForClass(QuestionAnswer);

@Schema()
export class Section {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [QuestionAnswerSchema], required: true })
  questions: QuestionAnswer[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);

@Schema()
class Location {
  @Prop({ required: false })
  latitude: number;

  @Prop({ required: false })
  longitude: number;
}

@Schema()
export class AnswerDocument extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  questionnaireId: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  vehiculo: string;

  @Prop({ type: [SectionSchema], required: true })
  sections: Section[];

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Location, required: false }) 
  location?: Location;
}

export const AnswerSchema = SchemaFactory.createForClass(AnswerDocument);
