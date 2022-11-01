import { BadRequestException, Injectable, Param } from '@nestjs/common';
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

  async create(
    userOwnerId: number,
    userUsernames: string[],
    isPrivate: boolean,
    name: string,
    profanityWords: string[],
  ): Promise<Chatroom> {
    const usersId = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              in: userUsernames,
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    const usersArrIds: { id: number }[] = usersId?.map((user) => ({
      id: user.id,
    }));

    usersArrIds.push({ id: userOwnerId });

    return this.prisma.chatroom.create({
      data: {
        userOwnerId,
        isPrivate,
        name,
        profanityWords,
        users: {
          connect: usersArrIds,
        },
        messages: {
          create: {
            message: 'Welcome to the chatroom! ⚡️',
            senderId: userOwnerId,
          },
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

  async findJoined(userId: number): Promise<Chatroom[]> {
    if (!userId) throw new BadRequestException('Please login');

    return this.prisma.chatroom.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
  }
}
