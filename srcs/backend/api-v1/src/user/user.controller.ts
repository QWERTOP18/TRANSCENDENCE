import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';
import { BaseController } from '../common/base.controller';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserBody, UpdateUserBody } from './user.dto';

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

  @Get('search')
  @ApiOperation({ summary: 'Search user by name' })
  async searchUser(@Query('query') query: string) {
    return this.userService.searchUser(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiBody({ type: UpdateUserBody })
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserBody) {
    return this.userService.updateUser(id, user);
  }
}
