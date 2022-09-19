import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CustomException } from '../exceptions/custom-exception';
import { UpdateUserDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  find(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        messages: undefined,
        chatrooms: undefined,
        admin: false,
      },
    });
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.user.delete({ where: { id } });

      return 'User deleted succesfuly';
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, body: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({ where: { id }, data: body });

      return user;
    } catch (error) {
      if (error.code === 'P2002')
        throw new CustomException(
          'This username is already in use',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      throw new NotFoundException('User not found');
    }
  }
}
