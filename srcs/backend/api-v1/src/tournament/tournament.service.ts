import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { CustomLoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';
import { AddParticipantDto } from './tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {}
  async getTournaments() {
    this.logger.log('Fetching all tournaments');
    return this.prisma.tournament.findMany({
      include: {
        participants: true,
      },
    });
  }
  async createTournament(tournamentData: any) {
    this.logger.log('Creating a new tournament');
    return this.prisma.tournament.create({
      data: tournamentData,
    });
  }
  async getTournament(id: string) {
    this.logger.log(`Fetching tournament with id: ${id}`);
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: parseInt(id) },
      include: {
        participants: true,
      },
    });
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    return tournament;
  }
  async updateTournament(id: string, tournamentData: any) {
    this.logger.log(`Updating tournament with id: ${id}`);
    const tournament = await this.prisma.tournament.update({
      where: { id: parseInt(id) },
      data: tournamentData,
    });
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    return tournament;
  }
  async addParticipantToTournament(participantData: AddParticipantDto) {
    this.logger.log(`Adding participant to tournament`);
    return this.prisma.tournament.update({
      where: { id: participantData.tournamentId },
      data: { participants: { connect: { id: participantData.userId } } },
    });
  }
}
