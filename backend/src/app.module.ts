import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompletionsModule } from './completion/completions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Completion'),
    CompletionsModule,
  ],
})
export class AppModule {}
