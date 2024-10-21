import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new NotFoundException(`User not found for email: ${email}`);
    }

    if (user.password !== password) {
      return new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ email }),
    };
  }
}
