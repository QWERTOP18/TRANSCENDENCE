import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { CustomLoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, CustomLoggerService],
})
export class AuthModule {}
