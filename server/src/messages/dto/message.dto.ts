import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class MessageDto {
  @Expose()
  id: number;

  @Expose()
  message: string;

  @Expose()
  senderId: number;

  @Expose()
  sender: any;

  @Expose()
  createdAt: Date;
}

export class SendMessageDto {
  @IsString()
  message: string;
}

export class DeleteMessageDto {
  @IsString()
  messageId: string;
}
