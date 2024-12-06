import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AnswersController } from './answer.controller';
import { AnswersService } from './answer.service';
import { AnswerDocument, AnswerSchema } from './answer.schema';
import { Questionnaire, QuestionnaireSchema } from '../questionnaire/schemas/questionnaire.schema'; 
import { QuestionnaireService } from '../questionnaire/questionnaire.service'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnswerDocument.name, schema: AnswerSchema }, 
      { name: Questionnaire.name, schema: QuestionnaireSchema }, 
    ]),
    MulterModule.register({
      dest: './uploads/answers', 
    }),
  ],
  controllers: [AnswersController],
  providers: [AnswersService, QuestionnaireService], 
  exports: [AnswersService], 
})
export class AnswersModule {}
