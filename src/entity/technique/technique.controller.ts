import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TechniqueService } from './technique.service';
import { Technique } from './technique.model';
import { CreateTechniqueDto } from './dto/create-technique';
import { Effect } from '../effect/effect.model';
import { CreateTechniqueEffectDto } from './dto/create-technique-effect';
import { TechniqueEffect } from './technique-effect.model';

@ApiTags('Technique')
@Controller('technique')
export class TechniqueController {
  constructor(private readonly techniqueService: TechniqueService) {
  }
  
  @ApiOperation({ summary: 'Получение списка техник' })
  @ApiResponse({ status: 200, type: [Technique] })
  @Get()
  async getTechniques() {
    return await this.techniqueService.getTechniques();
  }
  
  @ApiOperation({ summary: 'Создание техники' })
  @ApiResponse({ status: 200, type: Technique })
  @Post('/')
  async createTechnique(@Body() createTechniqueDto: CreateTechniqueDto) {
    return await this.techniqueService.createTechnique(createTechniqueDto);
  }
  
  @ApiOperation({ summary: 'Получение эффектов техники по id' })
  @ApiResponse({ status: 200, type: Technique })
  @Get(':technique_id')
  async getTechnique(@Param('technique_id') technique_id: number) {
    return await this.techniqueService.getTechnique(technique_id);
  }
  
  @ApiOperation({ summary: 'Обновление техники по id' })
  @ApiResponse({ status: 200, type: Technique })
  @Put(':technique_id')
  async updateTechnique(@Body() technique: Technique, @Param('technique_id') technique_id: number) {
    return await this.techniqueService.updateTechnique(technique, technique_id);
  }
  
  
  // Technique Effects
  @ApiOperation({ summary: 'Создание эффекта техники' })
  @ApiResponse({ status: 200, type: Effect })
  @Post('/:technique_id/effect')
  async createTechniqueEffect(@Body() createTechniqueEffectDto: CreateTechniqueEffectDto, @Param('technique_id') technique_id: number) {
    return await this.techniqueService.createTechniqueEffect(createTechniqueEffectDto, technique_id);
  }
  
  @ApiOperation({ summary: 'Получение эффекта техники' })
  @ApiResponse({ status: 200, type: [Effect] })
  @Get('/:technique_id/effect')
  async getTechniqueEffect(@Param('technique_id') technique_id: number) {
    return await this.techniqueService.getTechniqueEffect(technique_id);
  }
  
  @ApiOperation({ summary: 'Обновление эффекта техники по effect_id' })
  @ApiResponse({ status: 200, type: Technique })
  @Put('/:technique_id/effect/:effect_id')
  async updateTechniqueEffect(@Body() techniqueEffect: TechniqueEffect, @Param('effect_id') effect_id: number, @Param('technique_id') technique_id: number) {
    return await this.techniqueService.updateTechniqueEffect(techniqueEffect, effect_id, technique_id);
  }
  
  @ApiOperation({ summary: 'Удаление эффекта техники по effect_id' })
  @ApiResponse({ status: 200 })
  @Delete('/:technique_id/effect/:effect_id')
  async deleteTechniqueEffect(@Param('effect_id') effect_id: number, @Param('technique_id') technique_id: number) {
    return await this.techniqueService.deleteTechniqueEffect(effect_id, technique_id);
  }
}
