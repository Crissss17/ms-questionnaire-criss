// update-questionnaire.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateQuestionDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsString()
  type: 'yes-no' | 'multiple-choice' | 'text';
}

class UpdateSectionDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions: UpdateQuestionDto[];
}

export class UpdateQuestionnaireDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSectionDto)
  readonly sections?: UpdateSectionDto[];

  @IsOptional()
  @IsString()
  readonly vehiculo?: string;
}
