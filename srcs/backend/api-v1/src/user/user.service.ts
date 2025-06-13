import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';
import { CreateUserBody, UpdateUserBody } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService {
  constructor(prisma: PrismaService, logger: CustomLoggerService) {
    super(prisma, logger);
  }

  async getUsers() {
    try {
      this.logger.log('getUsers');
      return await this.prisma.user.findMany();
    } catch (error) {
      this.logger.error('Failed to fetch users', error.stack);
      throw error;
    }
  }

  async createUser(user: CreateUserBody) {
    try {
      this.logger.log('createUser');
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      if (user.image) {
        const imageUrl = await this.uploadImage(user.image);
        user.image = imageUrl;
      } else {
        user.image = process.env.DEFAULT_IMAGE_URL;
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw error;
    }
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async searchUser(query: string) {
    return this.prisma.user.findMany({
      where: {
        OR: [{ name: { contains: query } }],
      },
    });
  }

  async updateUser(id: string, updateUserBody: UpdateUserBody) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({
      where: { id: parseInt(id) },
      data: updateUserBody,
    });
  }

  private async uploadImage(imageUrl: string) {
    // todo databaseに保存して、そのパスを返す
    return imageUrl;
  }
}
