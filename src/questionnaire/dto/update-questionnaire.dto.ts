import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class UpdateQuestionDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsString()
  type: 'Sí/No' | 'Alternativa' | 'Texto';
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
  @IsString()
  readonly vehiculo?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSectionDto)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value); // Asegura que se pueda parsear a JSON
      } catch (error) {
        throw new Error('Invalid JSON format for sections');
      }
    }
    return value;
  })
  readonly sections?: UpdateSectionDto[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : []) // Asegura que images siempre sea un array
  images?: string[];
}