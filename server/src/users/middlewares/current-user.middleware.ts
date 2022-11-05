import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

interface UserFromTokenPayload {
  sub: number;
  email: string;
  username: string;
  exp: number;
  iat: number;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (accessToken) {
      const userFromToken: UserFromTokenPayload = this.jwtService.verify(
        accessToken,
        {
          secret: process.env.JWT_SECRET,
        },
      );

      if (Date.now() >= userFromToken.exp * 1000) {
        throw new BadRequestException({
          message: 'Token expired',
          error: 'expiredToken',
        });
      }

      req.currentUser = await this.usersService.find(userFromToken.sub);
    }

    next();
  }
}
