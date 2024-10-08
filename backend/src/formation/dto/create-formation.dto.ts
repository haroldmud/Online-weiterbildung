import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateFormationDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly image: string;
  @IsNumber()
  readonly price: number;
  @IsNumber()
  readonly wholesalePrice: number;
}
