import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { DeleteMessageDto, SendMessageDto } from './dto/message.dto';
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
    return this.messagesService.sendMessage(+roomId, user.id, body.message);
  }

  @Patch('/:roomId/:messageId')
  updateMessage(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
    @CurrentUser() user: User,
    @Body() body: SendMessageDto,
  ) {
    return this.messagesService.updateMessage(
      +roomId,
      +messageId,
      user.id,
      body.message,
    );
  }

  @Delete('/:roomId')
  deleteMessage(
    @Param('roomId') roomId: string,
    @CurrentUser() user: User,
    @Body() body: DeleteMessageDto,
  ) {
    return this.messagesService.deleteMessage(
      +roomId,
      user.id,
      +body.messageId,
    );
  }
}
