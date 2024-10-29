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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

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
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateFormationDto, description: 'Formation found' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.formationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateFormationDto, description: 'Formation updated' })
  update(
    @Param('id') id: string,
    @Body() updateFormationDto: UpdateFormationDto,
  ) {
    return this.formationService.update(id, updateFormationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateFormationDto, description: 'Formation deleted' })
  remove(@Param('id') id: string) {
    return this.formationService.remove(id);
  }
}
