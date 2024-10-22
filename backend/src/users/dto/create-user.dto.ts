import { IsOptional, IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  readonly role?: string;
}
