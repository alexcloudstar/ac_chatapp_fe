import { IsBoolean, IsString } from 'class-validator';

export class CreateChatroomDto {
  @IsString({ each: true })
  userUsernames: string[];

  @IsBoolean()
  isPrivate: boolean;

  @IsString()
  name: string;

  @IsString({ each: true })
  profanityWords: string[];
}
