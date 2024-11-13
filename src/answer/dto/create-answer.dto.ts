import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  questionnaireId: string;

  @IsArray()
  sections: any[];  // Usa el tipo correcto según el esquema

  @IsString()
  vehiculo: string;
}
