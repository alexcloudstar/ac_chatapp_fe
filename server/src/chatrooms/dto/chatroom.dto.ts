import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

interface IMessage {
  id: number;

  message: string;

  senderId: number;
}

export class ChatroomDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.messages?.map((message: IMessage) => ({
      id: message.id,
      message: message.message,
      senderId: message.senderId,
    })),
  )
  messages: IMessage;

  @Transform(({ obj }: { obj: { users: User[] } }) =>
    obj.users?.map((user) => ({ id: user.id })),
  )
  @Expose()
  users: { id: number }[];

  @Expose()
  userOwnerId: number;
}
