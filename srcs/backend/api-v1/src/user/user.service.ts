import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';
import { CreateUserBody } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService {
  constructor(prisma: PrismaService, logger: CustomLoggerService) {
    super(prisma, logger);
  }

  async getUsers() {
    this.logger.log('getUsers');
    return this.prisma.user.findMany();
  }

  async createUser(user: CreateUserBody) {
    this.logger.log('createUser');
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}
