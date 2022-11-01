import { User } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { MessageDto } from '../../messages/dto/message.dto';

export class ChatroomDto {
  @Expose()
  id: number;

  @Transform(({ obj }) =>
    obj.messages?.map((message: MessageDto) => ({
      id: message.id,
      message: message.message,
      senderId: message.senderId,
      createdAt: message.createdAt,
      sender: obj.users.reduce((acc: any, user: User) => {
        if (user.id === message.senderId) {
          acc = user;
        }
        return {
          username: acc.username,
          avatar: acc.avatar,
        };
      }, {}),
    })),
  )
  @Expose()
  messages: MessageDto[];

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
