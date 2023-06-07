import { Test, TestingModule } from '@nestjs/testing';
import { CompletionsController } from './completions.controller';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { CompletionsService } from './completions.service';

describe('Completions Controller', () => {
  let controller: CompletionsController;
  let service: CompletionsService;
  const createCompletionDto: CreateCompletionDto = {
    keyword: 'Keyword',
    model: 'Model',
    text: 'text',
    createdDate: new Date('2023-06-06T01:47:40.409Z'),
  };

  const mockCompletion = {
    keyword: 'Keyword',
    model: 'Model',
    text: 'text',
    createdDate: new Date('2023-06-06T01:47:40.409Z'),
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletionsController],
      providers: [
        {
          provide: CompletionsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                keyword: 'Keyword1',
                model: 'Model1',
                text: 'text1',
                createdDate: new Date('2023-06-06T01:47:40.409Z'),
              },
              {
                keyword: 'Keyword2',
                model: 'Model2',
                text: 'text2',
                createdDate: new Date('2023-06-06T01:47:40.409Z'),
              },
              {
                keyword: 'Keyword3',
                model: 'Model3',
                text: 'text3',
                createdDate: new Date('2023-06-06T01:47:40.409Z'),
              },
            ]),
            create: jest.fn().mockResolvedValue(createCompletionDto),
          },
        },
      ],
    }).compile();

    controller = module.get<CompletionsController>(CompletionsController);
    service = module.get<CompletionsService>(CompletionsService);
  });

  describe('create()', () => {
    it('should create a new completion', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockCompletion);

      await controller.create(createCompletionDto);
      expect(createSpy).toHaveBeenCalledWith(createCompletionDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of completions', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          keyword: 'Keyword1',
          model: 'Model1',
          text: 'text1',
          createdDate: new Date('2023-06-06T01:47:40.409Z'),
        },
        {
          keyword: 'Keyword2',
          model: 'Model2',
          text: 'text2',
          createdDate: new Date('2023-06-06T01:47:40.409Z'),
        },
        {
          keyword: 'Keyword3',
          model: 'Model3',
          text: 'text3',
          createdDate: new Date('2023-06-06T01:47:40.409Z'),
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
