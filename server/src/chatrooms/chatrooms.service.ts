import { Injectable, NotFoundException, Param } from '@nestjs/common';
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

  create(userOwnerId: number, userIds: string[]): Promise<Chatroom> {
    if (!userOwnerId)
      throw new NotFoundException('You are not logged in to create a chatroom');

    const usersArrIds = userIds?.map((id) => ({ id: +id }));

    return this.prisma.chatroom.create({
      data: {
        userOwnerId: userOwnerId,
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

  join(chatroomId: number, userId: number): Promise<Chatroom> {
    return this.prisma.chatroom.update({
      where: { id: chatroomId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
  }
}
