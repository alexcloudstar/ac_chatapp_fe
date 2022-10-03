import { Message, User } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ChatroomDto {
  @Expose()
  messages: any;

  @Expose()
  users: any;

  @Expose()
  userOwnerId: number;
}
