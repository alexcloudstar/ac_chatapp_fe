import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from '../utils/jwt/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signup(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<{
    accessToken: string;
  }> {
    const user = await this.authService.signup(
      body.email,
      body.username,
      body.password,
    );

    const payload = { email: user.email, username: user.username, id: user.id };

    const accessToken: string = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    session.accessToken = accessToken;

    return {
      accessToken,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.accessToken = null;
  }
}
