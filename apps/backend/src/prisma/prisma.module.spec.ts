import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

// Mock PrismaClient to avoid real database connections in unit tests
jest.mock('@prisma/client', () => {
  const mockPrismaClient = jest.fn().mockImplementation(() => ({
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    $on: jest.fn(),
  }));

  return {
    PrismaClient: mockPrismaClient,
  };
});

describe('PrismaModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide PrismaService', () => {
    const prismaService = module.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();
  });

  it('should export PrismaService for use in other modules', async () => {
    // Creating a module that imports PrismaModule should have access to PrismaService
    const consumerModule = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    const prismaService = consumerModule.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();

    await consumerModule.close();
  });
});
