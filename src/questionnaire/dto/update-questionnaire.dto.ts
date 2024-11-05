import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateQuestionDto {
  @IsString()
  text: string;

  @IsString()
  answer: string;
}

export class UpdateQuestionnaireDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  readonly questions?: UpdateQuestionDto[];

  @IsOptional()
  @IsString()
  readonly vehiculo?: string;  // Nuevo campo opcional para el tipo de vehículo
}
