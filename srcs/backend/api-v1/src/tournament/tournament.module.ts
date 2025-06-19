import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, PrismaService, CustomLoggerService],
  exports: [TournamentService],
})
export class TournamentModule {}
