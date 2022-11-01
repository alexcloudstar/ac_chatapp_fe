import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CustomException } from '../exceptions/custom-exception';
import { UpdateUserDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  find(id: number, currentUserId?: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        punishments: id === currentUserId,
      },
    });
  }

  findAll(currentUserId: number): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
      },
    });
  }

  async remove(id: number, loggedInUser: User): Promise<string> {
    if (id !== loggedInUser.id) throw new BadRequestException('Not authorized');

    try {
      await this.prisma.user.delete({ where: { id } });

      return 'User deleted successfully';
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, body: UpdateUserDto, loggedInUser: User) {
    if (id !== loggedInUser.id) throw new BadRequestException('Not authorized');

    try {
      return await this.prisma.user.update({
        where: { id },
        data: { ...body },
      });
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
