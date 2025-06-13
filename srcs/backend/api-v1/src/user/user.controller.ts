import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { CustomLoggerService } from 'src/logger/logger.service';
import { BaseController } from '../common/base.controller';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserBody } from './user.dto';

@ApiTags('users')
@Controller('user')
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
    prisma: PrismaService,
    logger: CustomLoggerService,
  ) {
    super(prisma, logger);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserBody })
  async createUser(@Body() user: CreateUserBody) {
    return this.userService.createUser(user);
  }
}
