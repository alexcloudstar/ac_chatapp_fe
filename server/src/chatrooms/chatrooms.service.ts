import { Injectable, Param } from '@nestjs/common';
import { Chatroom } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatroomsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Chatroom[]> {
    return this.prisma.chatroom.findMany({
      include: {
        users: true,
      },
    });
  }

  find(@Param() chatroomId: number): Promise<Chatroom> {
    return this.prisma.chatroom.findUnique({ where: { id: chatroomId } });
  }

  create(userOwnerId: number, userId: number): Promise<Chatroom> {
    return this.prisma.chatroom.create({
      data: {
        userOwnerId: userOwnerId,
        users: {
          connect: [
            {
              id: userId,
            },
          ],
        },
      },
    });
  }

  delete(chatroomId: number): Promise<Chatroom> {
    return this.prisma.chatroom.delete({ where: { id: chatroomId } });
  }

  join(chatroomId: number, userId: number): any {
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
