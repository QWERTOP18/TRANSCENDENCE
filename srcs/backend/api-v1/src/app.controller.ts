import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CustomLoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {}

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
