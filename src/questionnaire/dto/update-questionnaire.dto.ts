export class UpdateQuestionnaireDto {
    readonly name?: string;
    readonly questions?: Array<{ text: string; answer: string }>;
  }