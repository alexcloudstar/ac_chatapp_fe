import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatroomsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.chatroom.findMany();
  }

  create(ownerId: number, userId: User['id']) {
    return this.prisma.chatroom.create({
      data: {
        ownerId,
        chatroomsUserId: userId,
      },
    });
  }
}
