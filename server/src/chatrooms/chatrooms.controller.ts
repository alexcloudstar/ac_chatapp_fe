import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Chatroom, User } from '@prisma/client';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ChatroomsService } from './chatrooms.service';
import { ChatroomDto } from './dto/chatroom.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateChatroomDto } from './dto/create-chatroom.dto';

@Serialize(ChatroomDto)
@Controller('chatrooms')
export class ChatroomsController {
  constructor(private chatroomsService: ChatroomsService) {}

  @Get()
  findAll(): Promise<Chatroom[]> {
    return this.chatroomsService.findAll();
  }

  @Get('/:id')
  find(@Param('id') id: string): Promise<Chatroom> {
    return this.chatroomsService.find(+id);
  }

  @Post()
  create(
    @Body() body: CreateChatroomDto,
    @CurrentUser() user: User,
  ): Promise<Chatroom> {
    return this.chatroomsService.create(user?.id, body.userIds);
  }

  @Post('/:id/join')
  join(@Param('id') id: string, @Body() body: any): Promise<Chatroom> {
    return this.chatroomsService.join(+id, +body.userId);
  }
}
