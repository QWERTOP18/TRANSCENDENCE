import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { PrismaService } from 'src/prisma.service';
import { CustomLoggerService } from 'src/logger/logger.service';
import { BaseController } from 'src/common/base.controller';
import {
  AddParticipantDto,
  CreateTournamentDto,
  UpdateTournamentDto,
} from './tournament.dto';

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

  @Get(':id')
  async getTournament(@Param('id') id: string) {
    return this.tournamentService.getTournament(id);
  }

  @Post('create')
  async createTournament(@Body() tournamentData: CreateTournamentDto) {
    return this.tournamentService.createTournament(tournamentData);
  }

  @Post('add-participant')
  async addParticipant(@Body() participantData: AddParticipantDto) {
    return this.tournamentService.addParticipantToTournament(participantData);
  }

  @Patch(':id')
  async updateTournament(
    @Param('id') id: string,
    @Body() tournamentData: UpdateTournamentDto,
  ) {
    return this.tournamentService.updateTournament(id, tournamentData);
  }
}
