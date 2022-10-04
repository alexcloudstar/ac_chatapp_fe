import { Message, Role } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  avatar: string;

  @Expose()
  messages: Message[];

  @Expose()
  admin: boolean;

  @Expose()
  role: Role;

  @Expose()
  @IsDate()
  createdAt: string;
}
