import { IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  text: string;  // Texto de la pregunta

  @IsString()
  answer?: string;  // Respuesta opcional
}

export class CreateQuestionnaireDto {
  @IsString()
  readonly name: string;  // Nombre del cuestionario

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  readonly questions: QuestionDto[];  // Preguntas y respuestas
}
