import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(
    email: User['email'],
    password: User['password'],
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) throw new BadRequestException('User already exists');

    const hash = await argon2.hash(password);

    return this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const valid = await argon2.verify(user.password, password);

    if (valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(
    email: User['email'],
    password: User['password'],
  ): Promise<User> {
    console.log('123sssss');
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('User does not exist');

    const valid = await argon2.verify(user.password, password);

    if (!valid) throw new BadRequestException('Invalid password');

    return user;
  }
}
