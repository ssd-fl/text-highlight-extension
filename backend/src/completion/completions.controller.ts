import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompletionsService } from './completions.service';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { Completion } from './schemas/completion.schema';

@Controller('completions')
export class CompletionsController {
  constructor(private readonly completionsService: CompletionsService) {}

  @Post()
  async create(@Body() createCompletionDto: CreateCompletionDto) {
    await this.completionsService.create(createCompletionDto);
  }

  @Get()
  async findAll(): Promise<Completion[]> {
    return this.completionsService.findAll();
  }
}
