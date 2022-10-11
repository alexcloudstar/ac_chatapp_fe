import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Chatroom } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatroomsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Chatroom[]> {
    return this.prisma.chatroom.findMany({
      include: {
        users: true,
        messages: true,
      },
    });
  }

  find(@Param() chatroomId: number): Promise<Chatroom> {
    return this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
      include: {
        users: true,
        messages: true,
      },
    });
  }

  create(
    userOwnerId: number,
    userIds: string[],
    isPrivate: boolean,
    name: string,
    profanityWords: string[],
  ): Promise<Chatroom> {
    if (!userOwnerId)
      throw new NotFoundException('You are not logged in to create a chatroom');

    const usersArrIds = userIds?.map((id) => ({ id: +id }));

    return this.prisma.chatroom.create({
      data: {
        userOwnerId,
        isPrivate,
        name,
        profanityWords,
        users: {
          connect: usersArrIds,
        },
      },
      include: {
        users: true,
      },
    });
  }

  delete(chatroomId: number): Promise<Chatroom> {
    return this.prisma.chatroom.delete({ where: { id: chatroomId } });
  }

  async join(chatroomId: number, userId: number): Promise<Chatroom> {
    const room = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
    });

    if (room.isPrivate)
      throw new BadRequestException('This chatroom is private');

    return this.prisma.chatroom.update({
      where: { id: chatroomId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
  }

  async invite(chatroomId: number, userId: number): Promise<Chatroom> {
    const room = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
    });

    if (room.userOwnerId !== userId)
      throw new BadRequestException('You are not the owner of this chatroom');

    return this.prisma.chatroom.update({
      where: { id: chatroomId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
  }

  async leave(chatroomId: number, userId: number): Promise<Chatroom> {
    const room = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
    });

    if (room.userOwnerId === userId)
      throw new BadRequestException(
        'You are the owner of this chatroom, please delete room',
      );

    return this.prisma.chatroom.update({
      where: { id: chatroomId },
      data: {
        users: {
          disconnect: { id: userId },
        },
      },
    });
  }
}
