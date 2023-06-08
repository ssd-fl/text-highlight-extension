import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Model, Document } from 'mongoose';
import { CompletionsService } from './completions.service';
import { Completion } from './schemas/completion.schema';

const mockCompletion = {
  keyword: 'Keyword1',
  model: 'Model1',
  text: 'text1',
  tags: ['tag1'],
  createdDate: new Date('2023-06-06T01:47:40.409Z'),
};

const { ObjectId } = mongoose.Types;

const mockCompletion1 = [
  {
    keyword: 'Keyword1',
    model: 'Model1',
    text: 'text1',
    tags: ['tag1'],
    createdDate: new Date('2023-06-06T01:47:40.409Z'),
  },
] as unknown as (Document &
  Omit<Completion & { _id: typeof ObjectId }, never>)[];

describe('CompletionsService', () => {
  let service: CompletionsService;
  let model: Model<Completion>;

  const completionsArray = [
    {
      keyword: 'Keyword1',
      model: 'Model1',
      text: 'text1',
      tags: ['tag1'],
      createdDate: new Date('2023-06-06T01:47:40.409Z'),
    },
    {
      keyword: 'Keyword2',
      model: 'Model2',
      text: 'text2',
      tags: ['tag1'],
      createdDate: new Date('2023-06-06T01:47:40.409Z'),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletionsService,
        {
          provide: getModelToken('Completion'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCompletion),
            constructor: jest.fn().mockResolvedValue(mockCompletion),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CompletionsService>(CompletionsService);
    model = module.get<Model<Completion>>(getModelToken('Completion'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all completions', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(completionsArray),
    } as any);
    const completions = await service.findAll();
    expect(completions).toEqual(completionsArray);
  });

  it('should insert a new completion', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockCompletion1);
    const newCompletion = await service.create({
      keyword: 'Keyword1',
      model: 'Model1',
      text: 'text1',
      tags: ['tag1'],
      createdDate: new Date('2023-06-06T01:47:40.409Z'),
    });
    expect(newCompletion[0]).toEqual(mockCompletion);
  });
});
