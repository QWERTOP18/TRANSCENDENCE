import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CustomLoggerService } from './logger/logger.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, CustomLoggerService],
})
export class AppModule {}
