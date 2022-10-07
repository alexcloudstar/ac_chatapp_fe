import { Message, User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

interface IUser {
  id: number;
}

export class ChatroomDto {
  @Expose()
  messages: any;

  @Transform(({ obj }: { obj: { users: User[] } }) =>
    obj.users.map((user) => ({ id: user.id })),
  )
  @Expose()
  users: IUser[];

  @Expose()
  userOwnerId: number;
}
