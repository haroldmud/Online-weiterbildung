import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFormationDto: CreateFormationDto) {
    return this.prisma.formation.create({
      data: createFormationDto,
    });
  }

  findAll() {
    return this.prisma.formation.findMany();
  }

  findOne(id: string) {
    console.log('waesrdtfyghujkl,mkjhgfdseawsdfghjkmnjbhgvfds');
    return this.prisma.formation.findUnique({
      where: { id },
    });
  }

  update(id: string, updateFormationDto: UpdateFormationDto) {
    return this.prisma.formation.update({
      where: { id },
      data: updateFormationDto,
    });
  }

  remove(id: string) {
    return this.prisma.formation.delete({
      where: { id },
    });
  }
}
