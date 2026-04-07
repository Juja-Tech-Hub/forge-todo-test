import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should compile the module', () => {
    expect(moduleRef).toBeDefined();
  });

  it('should have ConfigService available globally', () => {
    const configService = moduleRef.get<ConfigService>(ConfigService);
    expect(configService).toBeDefined();
  });
});
