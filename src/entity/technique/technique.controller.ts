import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TechniqueService } from './technique.service';
import { Technique } from './technique.model';
import { CreateTechniqueDto } from './dto/create-technique';
import { Effect } from '../effect/effect.model';
import { CreateTechniqueEffectDto } from './dto/create-technique-effect';
import { TechniqueEffect } from './technique-effect.model';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export abstract class TechniqueQueryDTO {
  @IsBoolean()
  @IsOptional()
  hidden?: boolean;
  
  @IsInt()
  @IsOptional()
  race_id?: number;
  
  @IsInt()
  @IsOptional()
  class_id?: number;
  
  @IsInt()
  @IsOptional()
  author?: number;
}


@ApiTags('Technique')
@Controller('technique')
export class TechniqueController {
  constructor(private readonly techniqueService: TechniqueService) {
  }
  
  // Technique Branch
  @ApiOperation({ summary: 'Создание эффекта техники' })
  @ApiResponse({ status: 200, type: Effect })
  @Post('/branch/')
  async createBranchTechnique(@Body() createTechniqueEffectDto: CreateTechniqueEffectDto) {
    return await this.techniqueService.createBranchTechnique(createTechniqueEffectDto);
  }
  
  @ApiOperation({ summary: 'Получение техник ветки' })
  @ApiResponse({ status: 200, type: [Effect] })
  @Get('/branch/')
  async getBranchTechniques() {
    return await this.techniqueService.getBranchTechniques();
  }
  
  @ApiOperation({ summary: 'Получение техники ветки по id' })
  @ApiResponse({ status: 200, type: [Effect] })
  @Get('/branch/:branch_id')
  async getBranchTechnique(@Param('branch_id') branch_id: number) {
    return await this.techniqueService.getBranchTechnique(branch_id);
  }
  
  @ApiOperation({ summary: 'Обновление техники ветки по id' })
  @ApiResponse({ status: 200, type: Technique })
  @Put('/branch/:branch_id')
  async updateBranchTechnique(@Body() techniqueEffect: TechniqueEffect, @Param('branch_id') branch_id: number) {
    return await this.techniqueService.updateBranchTechnique(techniqueEffect, branch_id);
  }
  
  @ApiOperation({ summary: 'Удаление техники ветки по id' })
  @ApiResponse({ status: 200 })
  @Delete('/branch/:branch_id')
  async deleteBranchTechnique(@Param('branch_id') branch_id: number) {
    return await this.techniqueService.deleteBranchTechnique(branch_id);
  }
  
  
  // Technique
  @ApiOperation({ summary: 'Получение списка техник' })
  @ApiResponse({ status: 200, type: [Technique] })
  @Get()
  async getTechniques(@Query() techniqueQueryDTO: TechniqueQueryDTO) {
    return await this.techniqueService.getTechniques(techniqueQueryDTO);
  }
  
  @ApiOperation({ summary: 'Создание техники' })
  @ApiResponse({ status: 200, type: Technique })
  @Post('/')
  async createTechnique(@Body() createTechniqueDto: CreateTechniqueDto) {
    return await this.techniqueService.createTechnique(createTechniqueDto);
  }
  
  @ApiOperation({ summary: 'Получение эффектов техники по id' })
  @ApiResponse({ status: 200, type: Technique })
  @Get('/:technique_id')
  async getTechnique(@Param('technique_id') technique_id: number) {
    return await this.techniqueService.getTechnique(technique_id);
  }
  
  @ApiOperation({ summary: 'Обновление техники по id' })
  @ApiResponse({ status: 200, type: Technique })
  @Put('/:technique_id')
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
