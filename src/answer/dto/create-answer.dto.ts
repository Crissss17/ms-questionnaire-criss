import { IsString, IsArray, ValidateNested, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class CreateQuestionAnswerDto {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsNotEmpty()
  response: string;
}

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionAnswerDto)
  questions: CreateQuestionAnswerDto[];
}

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  questionnaireId: string;

  @IsString()
  @IsNotEmpty()
  vehiculo: string;

  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];

  @ValidateNested()
  @IsOptional() 
  @Type(() => LocationDto)
  location?: LocationDto;
}
