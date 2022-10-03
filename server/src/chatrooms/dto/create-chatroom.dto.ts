import { User } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class CreateChatroomDto {
  users: User[];

  @IsNumber()
  ownerId: number;
}
