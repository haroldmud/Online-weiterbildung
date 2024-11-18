import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSecureToken } from 'src/utils';
import * as bcrypt from 'bcrypt';

export const roundOfHashing = 10;

@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      if (await this.isEmailTaken(createUserDto.email)) {
        throw new BadRequestException('Email is already taken');
      }

      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        roundOfHashing,
      );
      const createdUser = this.prisma.user.create({ data: createUserDto });
      const emailVerificationToken = generateSecureToken();
      // Update user record with the verification token
      await this.prisma.user.update({
        where: { id: (await createdUser).id },
        data: { emailVerificationToken },
      });
      return createdUser;
    } catch (e) {
      console.error('Error:', e);
      throw new InternalServerErrorException('user creation failed');
    }
  }

  async verifyEmail(token: string) {
    // Find user by email verification token
    const user = await this.prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or Expired token');
    }

    // Update user record to mark the email as verified
    return this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailVerificationToken: '' },
    });
  }

  async findByUsername(username: string): Promise<CreateUserDto> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new InternalServerErrorException('user not found');
    }
    return {
      ...user,
      emailVerificationToken: user.emailVerificationToken || '',
      emailVerified: user.emailVerified || false,
    };
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true, email: true, role: true },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(
        updateUserDto.password,
        roundOfHashing,
      );
    }
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
