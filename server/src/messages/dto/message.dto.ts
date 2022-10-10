import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @Expose()
  id: number;

  @Expose()
  message: string;

  @Expose()
  senderId: number;
}

export class SendMessageDto {
  @IsString()
  message: string;
}

export class DeleteMessageDto {
  @IsString()
  messageId: string;
}
