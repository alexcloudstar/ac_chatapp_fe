import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.authService.signup(body.email, body.password);

    const payload = { email: user.email, username: user.username, id: user.id };

    const accessToken: string = this.jwtService.sign(payload);

    session.accessToken = accessToken;

    return {
      accessToken,
    };
  }

  @Post('/signin')
  async signin(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<{
    accessToken: string;
  }> {
    const user = await this.authService.signin(body.email, body.password);

    if (!user)
      throw new NotFoundException(
        `User not found with given email: ${body.email}`,
      );

    const payload = { email: user.email, username: user.username, id: user.id };
    const accessToken: string = this.jwtService.sign(payload);

    session.accessToken = accessToken;

    return {
      accessToken,
    };
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.accessToken = null;
  }
}
