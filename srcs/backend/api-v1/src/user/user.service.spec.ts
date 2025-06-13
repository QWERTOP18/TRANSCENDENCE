import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let loggerService: CustomLoggerService;

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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
      providers: [
        UserService,
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

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    loggerService = module.get<CustomLoggerService>(CustomLoggerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
        },
        {
          id: 2,
          email: 'test2@example.com',
          name: 'Test User 2',
          password: 'hashed_password_2',
          image: 'https://sample.com',
        },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockPrismaService.user.findMany).toHaveBeenCalled();
      expect(mockLoggerService.log).toHaveBeenCalledWith('getUsers');
    });

    it('should handle errors when fetching users', async () => {
      const error = new Error('Database error');
      mockPrismaService.user.findMany.mockRejectedValue(error);

      await expect(service.getUsers()).rejects.toThrow('Database error');
      expect(mockLoggerService.error).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const newUser = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password123',
        image: 'https://sample.com',
      };

      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const createdUser: User = {
        id: 1,
        ...newUser,
        password: hashedPassword,
      };

      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await service.createUser(newUser);

      expect(result).toEqual(createdUser);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...newUser,
          password: expect.stringMatching(/^\$2[aby]\$\d+\$/), // bcrypt hash pattern
        },
      });
      expect(mockLoggerService.log).toHaveBeenCalledWith('createUser');
    });

    it('should handle errors when creating a user', async () => {
      const newUser = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password123',
        image: 'https://sample.com',
      };

      const error = new Error('Email already exists');
      mockPrismaService.user.create.mockRejectedValue(error);

      try {
        await service.createUser(newUser);
      } catch (e) {
        expect(e).toEqual(error);
        expect(mockLoggerService.error).toHaveBeenCalled();
      }
    });
  });
});
