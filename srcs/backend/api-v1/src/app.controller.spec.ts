import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CustomLoggerService } from './logger/logger.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockPrismaService = {
    $queryRaw: jest.fn(),
  };

  const mockLoggerService = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
    setContext: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: CustomLoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('test-db', () => {
    it('should return success when database connection is working', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([{ 1: 1 }]);

      const result = await appController.testDatabase();

      expect(result).toEqual({
        status: 'success',
        message: 'Database connection is working',
        timestamp: expect.any(String),
      });
      expect(mockPrismaService.$queryRaw).toHaveBeenCalled();
    });

    it('should return error when database connection fails', async () => {
      const error = new Error('Connection failed');
      mockPrismaService.$queryRaw.mockRejectedValue(error);

      const result = await appController.testDatabase();

      expect(result).toEqual({
        status: 'error',
        message: 'Database connection failed',
        error: 'Connection failed',
        timestamp: expect.any(String),
      });
    });
  });
});
