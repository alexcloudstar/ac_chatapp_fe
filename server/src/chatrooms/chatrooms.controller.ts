import { Body, Controller, Get, Post } from '@nestjs/common';
import { Chatroom, User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dto/user.dto';
import { ChatroomsService } from './chatrooms.service';

@Serialize(UserDto)
@Controller('chatrooms')
export class ChatroomsController {
  constructor(private chatroomsService: ChatroomsService) {}

  @Get()
  findAll(): Promise<Chatroom[]> {
    return this.chatroomsService.findAll();
  }

  @Post()
  create(@Body() body: any): Promise<Chatroom> {
    return this.chatroomsService.create(+body.id, +body.id);
  }
}
