import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
<<<<<<< HEAD
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
=======
import { ApiBearerAuth } from '@nestjs/swagger';
>>>>>>> feat: seperating frontend sub-repo from backend for a smooth deployment

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  @ApiOkResponse({
    type: CreateFormationDto,
    isArray: true,
    description: 'Formation created',
  })
  create(@Body() createFormationDto: CreateFormationDto) {
    return this.formationService.create(createFormationDto);
  }

  @Get()
  @ApiOkResponse({ type: CreateFormationDto, description: 'Formation found' })
  findAll() {
    return this.formationService.findAll();
  }

  @Get(':id')
<<<<<<< HEAD
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateFormationDto, description: 'Formation found' })
=======
>>>>>>> feat: seperating frontend sub-repo from backend for a smooth deployment
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.formationService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateFormationDto, description: 'Formation updated' })
  update(
    @Param('id') id: string,
    @Body() updateFormationDto: UpdateFormationDto,
  ) {
    return this.formationService.update(id, updateFormationDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateFormationDto, description: 'Formation deleted' })
  remove(@Param('id') id: string) {
    return this.formationService.remove(id);
  }
}
