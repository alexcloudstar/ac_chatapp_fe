import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { DeleteMessageDto, SendMessageDto } from './dto/message.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { MessageDto } from './dto/message.dto';
import { JwtAuthGuard } from '../utils/jwt/jwt-auth.guard';

@Serialize(MessageDto)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getRoomMessages(@Param('roomId') roomId: string) {
    return this.messagesService.getRoomMessages(+roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:roomId')
  sendMessage(
    @Param('roomId') roomId: string,
    @CurrentUser() user: User,
    @Body() body: SendMessageDto,
  ) {
    return this.messagesService.sendMessage(+roomId, user.id, body.message);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
