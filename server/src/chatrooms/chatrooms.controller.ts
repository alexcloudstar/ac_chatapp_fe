import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Chatroom } from '@prisma/client';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ChatroomsService } from './chatrooms.service';
import { ChatroomDto } from './dto/chatroom.dto';

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
  create(@Body() body: any): Promise<Chatroom> {
    return this.chatroomsService.create(+body.ownerId, +body.userId);
  }
}
