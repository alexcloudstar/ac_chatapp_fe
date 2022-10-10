import { Injectable, NotFoundException } from '@nestjs/common';
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
}
