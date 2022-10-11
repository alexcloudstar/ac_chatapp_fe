import { IsBoolean, IsString } from 'class-validator';

export class CreateChatroomDto {
  @IsString({ each: true })
  userIds: string[];

  @IsBoolean()
  isPrivate: boolean;

  @IsString()
  name: string;

  @IsString({ each: true })
  profanityWords: string[];
}
