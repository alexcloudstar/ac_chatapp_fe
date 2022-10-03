import { Injectable } from '@nestjs/common';
import { Chatroom } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatroomsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Chatroom[]> {
    return this.prisma.chatroom.findMany();
  }

  async create(userOwnerId: number, userId: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });

      return this.prisma.chatroom.create({
        data: {
          userOwnerId,
          users: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
