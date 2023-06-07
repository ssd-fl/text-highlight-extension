import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompletionsController } from './completions.controller';
import { CompletionsService } from './completions.service';
import { Completion, CompletionSchema } from './schemas/completion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Completion.name, schema: CompletionSchema },
    ]),
  ],
  controllers: [CompletionsController],
  providers: [CompletionsService],
})
export class CompletionsModule {}
