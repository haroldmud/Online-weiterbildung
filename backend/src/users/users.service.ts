import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        roundOfHashing,
      );
      return this.prisma.user.create({ data: createUserDto });
    } catch (e) {
      console.error('Error:', e);
      throw new InternalServerErrorException('user creation failed');
    }
  }

  async findByUsername(username: string): Promise<CreateUserDto> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new InternalServerErrorException('user not found');
    }
    return user;
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
