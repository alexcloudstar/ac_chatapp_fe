import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  avatar?: string;
}
