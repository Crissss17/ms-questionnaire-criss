// dto/create-questionnaire.dto.ts
import { IsString, IsArray, ArrayNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  text: string;

  @IsOptional() 
  @IsString()
  answer?: string;
}

export class CreateQuestionnaireDto {
  @IsString()
  readonly name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  readonly questions: QuestionDto[];

  @IsString()  // Nuevo campo para "vehiculo"
  @IsOptional()
  readonly vehiculo?: string;
}

// dto/update-questionnaire.dto.ts
export class UpdateQuestionnaireDto {
  readonly name?: string;
  readonly questions?: Array<{ text: string; answer: string }>;

  @IsString()  // Nuevo campo para "vehiculo"
  @IsOptional()
  readonly vehiculo?: string;
}
