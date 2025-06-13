import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';

@Module({
  providers: [UserService, PrismaService, CustomLoggerService],
  controllers: [UserController],
})
export class UserModule {}
