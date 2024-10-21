import { IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
  @IsString()
  readonly role: string;
}
