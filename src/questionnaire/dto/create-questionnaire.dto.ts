// create-questionnaire.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';

class QuestionDto {
  @IsString()
  text: string;

  @IsString()
  @IsEnum(['Sí/No', 'Alternativa', 'Texto'])
  type: 'Sí/No' | 'Alternativa' | 'Texto';

  @IsOptional() // <-- Asegúrate de que la respuesta sea opcional
  @IsString()
  answer?: string;
}

class SectionDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

export class CreateQuestionnaireDto {
  @IsString()
  readonly name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  readonly sections: SectionDto[];

  @IsOptional()
  @IsString()
  readonly vehiculo?: string;
}
