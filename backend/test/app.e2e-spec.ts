import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CompletionsModule } from '../src/completion/completions.module';
import { CompletionsService } from '../src/completion/completions.service';
import { AppModule } from '../src/app.module';

describe('Completions (e2e)', () => {
  let app: INestApplication;
  const completionsService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CompletionsModule],
    })
      .overrideProvider(CompletionsService)
      .useValue(completionsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/Get completions', () => {
    return request(app.getHttpServer())
      .get('/completions')
      .expect(200)
      .expect(completionsService.findAll());
  });
});
