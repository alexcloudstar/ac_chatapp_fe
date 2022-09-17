import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
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

  @IsBoolean()
  admin: boolean;
}
