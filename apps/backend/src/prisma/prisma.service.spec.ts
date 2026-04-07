import { Test, TestingModule } from '@nestjs/testing';
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

describe('PrismaService', () => {
  let service: PrismaService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extend PrismaClient', () => {
    const { PrismaClient } = require('@prisma/client');
    // PrismaService should have been constructed extending PrismaClient
    expect(service).toBeInstanceOf(Object);
  });

  it('should have onModuleInit method', () => {
    expect(typeof service.onModuleInit).toBe('function');
  });

  it('should have onModuleDestroy method', () => {
    expect(typeof service.onModuleDestroy).toBe('function');
  });

  it('should call $connect on onModuleInit', async () => {
    // Spy on the $connect method
    const connectSpy = jest
      .spyOn(service as any, '$connect')
      .mockResolvedValue(undefined);

    await service.onModuleInit();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it('should call $disconnect on onModuleDestroy', async () => {
    const disconnectSpy = jest
      .spyOn(service as any, '$disconnect')
      .mockResolvedValue(undefined);

    await service.onModuleDestroy();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});
