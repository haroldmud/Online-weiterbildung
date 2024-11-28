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
  @IsOptional()
  emailVerificationToken: string; // <-- This field should be optional
  @IsOptional()
  emailVerified: boolean;
}
