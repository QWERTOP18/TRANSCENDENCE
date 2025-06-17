import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CustomLoggerService } from './logger/logger.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TournamentModule } from './tournament/tournament.module';

@Module({
  imports: [UserModule, AuthModule, TournamentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, CustomLoggerService],
})
export class AppModule {}
