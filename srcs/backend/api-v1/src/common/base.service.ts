import { PrismaService } from '../prisma.service';
import { CustomLoggerService } from '../logger/logger.service';

export class BaseService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly logger: CustomLoggerService,
  ) {
    this.logger.setContext(this.constructor.name);
  }
}
