import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(username: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } });
      if (!user) {
        return new NotFoundException(
          `User not found for username: ${username}`,
        );
      }
      const userPwd = bcrypt.compare(password, user.password);
      if (!userPwd) {
        return new BadRequestException('Password does not match');
      }

      return {
        accessToken: this.jwtService.sign({ username }),
      };
    } catch (e) {
      console.error('Error:', e);
    }
  }
}
