import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';
import { User } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    getUsers: jest.fn(),
    createUser: jest.fn(),
  };

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
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

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          email: 'test1@example.com',
          name: 'Test User 1',
          password: 'hashed_password_1',
          image: 'https://sample.com',
          // createdAt: new Date(),
          // updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'test2@example.com',
          name: 'Test User 2',
          password: 'hashed_password_2',
          image: 'https://sample.com',
          // createdAt: new Date(),
          // updatedAt: new Date(),
        },
      ];

      mockUserService.getUsers.mockResolvedValue(mockUsers);

      const result = await controller.getUsers();

      expect(result).toEqual(mockUsers);
      expect(userService.getUsers).toHaveBeenCalled();
    });

    it('should handle errors when fetching users', async () => {
      const error = new Error('Database error');
      mockUserService.getUsers.mockRejectedValue(error);

      await expect(controller.getUsers()).rejects.toThrow('Database error');
    });
  });
});
