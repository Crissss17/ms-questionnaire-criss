// src/answers/answer.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer, AnswerSchema } from './answer.schema';
import { AuthModule } from 'src/auth/check-token/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    AuthModule, 
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswersModule {}
