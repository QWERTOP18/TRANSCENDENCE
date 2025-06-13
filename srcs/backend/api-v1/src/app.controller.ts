import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CustomLoggerService } from './logger/logger.service';
import { BaseController } from './common/base.controller';

@Controller()
export class AppController extends BaseController {
  constructor(
    private readonly appService: AppService,
    prisma: PrismaService,
    logger: CustomLoggerService,
  ) {
    super(prisma, logger);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDatabase() {
    this.logger.log('Testing database connection');
    try {
      // データベース接続をテスト
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'success',
        message: 'Database connection is working',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
