import { Chatroom, Message, Role } from '@prisma/client';
import { Expose } from 'class-transformer';

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
  chatrooms: Chatroom[];

  @Expose()
  admin: boolean;

  @Expose()
  role: Role;
}
