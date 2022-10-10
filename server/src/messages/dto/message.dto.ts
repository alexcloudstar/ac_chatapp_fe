import { Expose } from 'class-transformer';

export class MessageDto {
  @Expose()
  id: number;

  @Expose()
  message: string;

  @Expose()
  senderId: number;
}
