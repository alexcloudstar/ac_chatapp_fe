import { IsString } from 'class-validator';

export class CreateChatroomDto {
  @IsString({ each: true })
  userIds: string[];

  // @Expose()
  // name: string;
}
