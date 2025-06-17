import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/prisma.service';
import { CustomLoggerService } from 'src/logger/logger.service';
import { SigninBody, SignupBody } from './auth.dto';

@Injectable()
export class AuthService extends BaseService {
  constructor(prisma: PrismaService, logger: CustomLoggerService) {
    super(prisma, logger);
  }

  async signup(signupBody: SignupBody) {}
  async signin(signinBody: SigninBody) {}
  async signout() {}
}
