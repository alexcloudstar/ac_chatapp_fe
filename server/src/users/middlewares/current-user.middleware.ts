import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers?.authorization?.includes('Bearer'))
      throw new BadRequestException('Invalid token');

    const accessToken = req.headers.authorization.split(' ')[1];
    if (accessToken) {
      const userFromToken: {
        id: number;
        email: string;
      } = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersService.find(userFromToken.id);
      req.currentUser = user;
    }

    next();
  }
}
