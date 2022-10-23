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
      sender: obj.users.reduce((acc, user) => {
        if (user.id === message.senderId) {
          acc.push({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
          });
        }
        return {
          id: acc.id,
          username: acc.username,
          avatar: acc.avatar,
        };
      }),
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

  @Expose()
  isPrivate: boolean;

  @Expose()
  name: string;

  @Expose()
  profanityWords: string[];
}
