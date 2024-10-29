import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(
    @Body() { username, password }: LoginDto,
  ): Promise<AuthEntity | BadRequestException> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.authService.login(username, hashedPassword);
  }
}
