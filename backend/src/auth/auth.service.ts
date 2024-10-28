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

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ username: string } | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (user && bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

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

  async register(username: string, email: string, passWord: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(passWord, salt);
      const user = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (e) {
      console.error('Error:', e);
    }
  }
}
