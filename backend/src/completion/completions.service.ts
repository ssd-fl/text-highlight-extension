import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { Completion } from './schemas/completion.schema';

@Injectable()
export class CompletionsService {
  constructor(
    @InjectModel(Completion.name)
    private readonly completionModel: Model<Completion>,
  ) {}

  async create(createCompletionDto: CreateCompletionDto): Promise<Completion> {
    const createdCompletion = await this.completionModel.create(
      createCompletionDto,
    );
    return createdCompletion;
  }

  async findAll(): Promise<Completion[]> {
    return this.completionModel.find().exec();
  }
}
