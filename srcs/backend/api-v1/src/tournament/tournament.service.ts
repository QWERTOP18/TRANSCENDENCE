import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { CustomLoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TournamentService extends BaseService {
  constructor(prisma: PrismaService, logger: CustomLoggerService) {
    super(prisma, logger);
  }
  async getTournaments() {
    this.logger.log('Fetching all tournaments');
    return this.prisma.tournament.findMany({
      include: {
        users: true,
      },
    });
  }
}
