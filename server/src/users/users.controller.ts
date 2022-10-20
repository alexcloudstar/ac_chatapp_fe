import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';

import { UpdateUserDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
