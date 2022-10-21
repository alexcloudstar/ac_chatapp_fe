import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(
    email: User['email'],
    username: User['username'],
    password: User['password'],
  ): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) throw new BadRequestException('User already exists');

    const hash = await argon2.hash(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hash,
      },
    });

    const payload = {
      email: newUser.email,
      username: newUser.username,
      sub: newUser.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User does not exist');

    const valid = await argon2.verify(user.password, password);

    if (valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: Omit<User, 'password'>): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
