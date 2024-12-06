import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';

export class QuestionDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  text: string;

  @IsEnum(['Sí/No', 'Alternativa', 'Texto'])
  type: 'Sí/No' | 'Alternativa' | 'Texto';

  @IsOptional()
  @IsString()
  answer?: string;
}

export class SectionDto {
  @IsOptional()
  @IsString()
  _id?: string;

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

  @IsOptional()
  @IsArray()
  images?: string[];
}