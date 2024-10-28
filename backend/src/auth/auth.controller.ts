import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.authService.login(username, hashedPassword);
  }

  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  async register(
    @Body() req: { username: string; email: string; password: string },
  ) {
    const { username, email, password } = req;
    return this.authService.register(username, email, password);
  }
}
