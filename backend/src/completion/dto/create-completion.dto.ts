export class CreateCompletionDto {
  readonly model: string;
  readonly keyword: string;
  readonly text: string;
  readonly tags: string[];
  readonly createdDate: Date;
}
