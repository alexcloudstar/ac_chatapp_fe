import { Chatrooms, Messages, Role } from '@prisma/client';
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
  messages: Messages[];

  @Expose()
  chatrooms: Chatrooms[];

  @Expose()
  admin: boolean;

  @Expose()
  role: Role;
}
