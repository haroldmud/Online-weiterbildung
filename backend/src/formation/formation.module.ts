import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
