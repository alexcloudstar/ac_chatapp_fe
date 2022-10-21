import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';

import { UpdateUserDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../utils/jwt/jwt-auth.guard';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
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
