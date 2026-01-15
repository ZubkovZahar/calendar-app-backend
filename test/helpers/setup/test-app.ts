import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { App } from 'supertest/types';

import { AppModule } from 'src/app.module';
import { globalValidationPipe } from 'src/common/configs/validation-pipe.config';

export class TestApp {
  private app: INestApplication<App>;

  async start(): Promise<INestApplication<App>> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleFixture.createNestApplication();

    this.app.useGlobalPipes(globalValidationPipe);

    await this.app.init();

    return this.app;
  }

  async close() {
    if (this.app) {
      await this.app.close();
    }
  }
}
