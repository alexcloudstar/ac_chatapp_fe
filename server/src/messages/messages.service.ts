import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Chatroom, Message, User } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Message[]> {
    const messages: Message[] = await this.prismaService.message.findMany();

    if (!messages.length) throw new NotFoundException('No messages found');

    return messages;
  }

  async getRoomMessages(roomId: Chatroom['id']): Promise<Message[]> {
    const messages: Message[] = await this.prismaService.message.findMany({
      where: {
        chatroomId: roomId,
      },
    });

    if (!messages.length) throw new NotFoundException('No messages found');

    return messages;
  }

  async sendMessage(
    roomId: Chatroom['id'],
    userId: User['id'],
    message: string,
  ): Promise<Message> {
    const room = await this.prismaService.chatroom.findUnique({
      where: { id: roomId },
      include: { users: true },
    });

    if (!room) throw new NotFoundException('No room found');

    if (!message) throw new NotFoundException('No message found');

    if (!room.users.find((user) => user.id === userId))
      throw new NotFoundException('Please join the room first');

    const newMessage: Message = await this.prismaService.message.create({
      data: {
        message,
        senderId: userId,
        chatroomId: roomId,
      },
    });

    return newMessage;
  }

  async updateMessage(
    roomId: Chatroom['id'],
    messageId: Message['id'],
    userId: User['id'],
    message: string,
  ) {
    const room = await this.prismaService.chatroom.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) throw new NotFoundException('No room found');

    const messageToUpdate = await this.prismaService.message.update({
      where: { id: messageId },
      data: {
        message,
      },
    });

    if (!messageToUpdate) throw new NotFoundException('No message found');

    if (messageToUpdate.senderId !== userId)
      throw new UnauthorizedException('You are not the sender of this message');

    return messageToUpdate;
  }

  async deleteMessage(
    roomId: Chatroom['id'],
    userId: User['id'],
    messageId: number,
  ): Promise<Chatroom> {
    const room = await this.prismaService.chatroom.findUnique({
      where: {
        id: roomId,
      },
      include: {
        messages: true,
        users: true,
      },
    });

    if (!room) throw new NotFoundException('No room found');

    const messageToDelete = await this.prismaService.message.findUnique({
      where: { id: messageId },
    });

    if (!messageToDelete) throw new NotFoundException('No message found');

    if (messageToDelete.senderId !== userId)
      throw new UnauthorizedException('You are not the sender of this message');

    await this.prismaService.message.delete({ where: { id: messageId } });

    return room;
  }
}
