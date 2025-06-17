import { Body, Controller, Get, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { PrismaService } from 'src/prisma.service';
import { CustomLoggerService } from 'src/logger/logger.service';
import { BaseController } from 'src/common/base.controller';
import { createTournamentBody } from './tournament.dto';

@Controller('tournament')
export class TournamentController extends BaseController {
  constructor(
    private readonly tournamentService: TournamentService,
    prisma: PrismaService,
    logger: CustomLoggerService,
  ) {
    super(prisma, logger);
  }

  @Get()
  async getTournaments() {
    return this.tournamentService.getTournaments();
  }

  @Post()
  async createTournament(@Body() tournamentData: createTournamentBody) {
    return this.tournamentService.createTournament(tournamentData);
  }
}
