import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Chatroom, PunishmentType, User } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany({
      where: {
        isAdmin: true,
      },
    });
  }

  async toggleAdmin(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        isAdmin: !user.isAdmin,
      },
    });
  }

  async punishUser(
    chatroomId: Chatroom['id'],
    currentUser: User,
    userId: User['id'],
    reason: string,
    type: PunishmentType,
    duration: number,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return this.prismaService.punishment.create({
      data: {
        chatroomId,
        userId,
        reason,
        type,
        duration,
      },
    });
  }
}
