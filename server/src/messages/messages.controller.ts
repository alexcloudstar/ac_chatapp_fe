import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { MessageDto } from './dto/message.dto';

@Serialize(MessageDto)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get()
  getRoomMessages(@Param('roomId') roomId: string) {
    return this.messagesService.getRoomMessages(+roomId);
  }

  @Post('/:roomId')
  sendMessage(
    @Param('roomId') roomId: string,
    @CurrentUser() user: User,
    @Body() body: SendMessageDto,
  ) {
    // console.log(roomId);
    return this.messagesService.sendMessage(+roomId, user.id, body.message);
  }
}
