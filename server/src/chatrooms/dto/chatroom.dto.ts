import { Message, User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

interface IUser {
  id: number;
}

export class ChatroomDto {
  @Expose()
  id: number;

  @Expose()
  messages: any;

  @Transform(({ obj }: { obj: { users: User[] } }) =>
    obj.users?.map((user) => ({ id: user.id })),
  )
  @Expose()
  users: { id: number }[];

  @Expose()
  userOwnerId: number;
}
