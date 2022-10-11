import { Chatroom, PunishmentType, User } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreatePunishDto {
  @IsString()
  chatroomId: Chatroom['id'];

  @IsString()
  userId: User['id'];

  @IsString()
  reason: string;

  @IsString()
  type: PunishmentType;

  @IsNumber()
  duration: number;
}
