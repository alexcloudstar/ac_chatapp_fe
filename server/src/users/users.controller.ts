import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }
}
