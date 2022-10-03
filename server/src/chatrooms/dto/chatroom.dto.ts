import { User } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ChatroomDto {
  @Expose()
  chatroomsUserId: any;

  @Expose()
  chatoomsUser: any;

  @Expose()
  ownerId: number;
}
