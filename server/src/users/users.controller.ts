import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('/whoami')
  whoami(@CurrentUser() user: User) {
    if (!user) throw new NotFoundException(`You are not logged in`);

    return user;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    try {
      return await this.usersService.find(parseInt(id), user.id);
    } catch (error) {
      throw new NotFoundException(`User not found with given id: ${id}`);
    }
  }

  @Post('/signup')
  async signup(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signup(body.email, body.password);

    session.userId = user.id;

    return user;
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
    session.userId = null;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @CurrentUser() user: User) {
    return this.usersService.remove(parseInt(id), user);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.update(parseInt(id), body, user);
  }
}
