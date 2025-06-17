import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { CustomLoggerService } from 'src/logger/logger.service';
import { BaseController } from 'src/common/base.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SigninBody, SignupBody } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    prisma: PrismaService,
    logger: CustomLoggerService,
  ) {
    super(prisma, logger);
  }
  @Post('signup')
  @ApiOperation({ summary: 'Sign up' })
  async signup(@Body() signupBody: SignupBody) {
    return this.authService.signup(signupBody);
  }
  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  async signin(@Body() signinBody: SigninBody) {
    return this.authService.signin(signinBody);
  }
  @Post('signout')
  @ApiOperation({ summary: 'Sign out' })
  async signout() {
    return this.authService.signout();
  }
}
