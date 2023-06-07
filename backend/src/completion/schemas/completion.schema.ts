import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompletionDocument = HydratedDocument<Completion>;

@Schema()
export class Completion {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  keyword: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: Date.now() })
  createdDate: Date;
}

export const CompletionSchema = SchemaFactory.createForClass(Completion);
