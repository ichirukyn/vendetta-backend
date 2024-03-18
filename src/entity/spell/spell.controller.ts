import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpellService } from './spell.service';
import { Spell } from './spell.model';
import { CreateSpellDto } from './dto/create-spell';
import { Effect } from '../effect/effect.model';
import { CreateSpellEffectDto } from './dto/create-spell-effect';
import { SpellEffect } from './spell-effect.model';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { CreateSpellBranchDto } from './dto/create-spell-branch';

export abstract class SpellQueryDTO {
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
  author_id?: number;
}


@ApiTags('Spell')
@Controller('spell')
export class SpellController {
  constructor(private readonly spellService: SpellService) {
  }
  
  // Spell Branch
  @ApiOperation({ summary: 'Создание эффекта заклинания' })
  @ApiResponse({ status: 200, type: Effect })
  @Post('/branch/')
  async createBranchSpell(@Body() createSpellBranchDto: CreateSpellBranchDto) {
    return await this.spellService.createBranchSpell(createSpellBranchDto);
  }
  
  @ApiOperation({ summary: 'Получение заклинаний ветки' })
  @ApiResponse({ status: 200, type: [Effect] })
  @Get('/branch/')
  async getBranchSpells() {
    return await this.spellService.getBranchSpells();
  }
  
  @ApiOperation({ summary: 'Получение заклинания ветки по id' })
  @ApiResponse({ status: 200, type: [Effect] })
  @Get('/branch/:branch_id')
  async getBranchSpell(@Param('branch_id') branch_id: number) {
    return await this.spellService.getBranchSpell(branch_id);
  }
  
  @ApiOperation({ summary: 'Обновление заклинания ветки по id' })
  @ApiResponse({ status: 200, type: Spell })
  @Put('/branch/:branch_id')
  async updateBranchSpell(@Body() spellEffect: SpellEffect, @Param('branch_id') branch_id: number) {
    return await this.spellService.updateBranchSpell(spellEffect, branch_id);
  }
  
  @ApiOperation({ summary: 'Удаление заклинания ветки по id' })
  @ApiResponse({ status: 200 })
  @Delete('/branch/:branch_id')
  async deleteBranchSpell(@Param('branch_id') branch_id: number) {
    return await this.spellService.deleteBranchSpell(branch_id);
  }
  
  
  // Spell
  @ApiOperation({ summary: 'Получение списка заклинаний' })
  @ApiResponse({ status: 200, type: [Spell] })
  @Get()
  async getSpells(@Query() spellQueryDTO: SpellQueryDTO) {
    return await this.spellService.getSpells(spellQueryDTO);
  }
  
  @ApiOperation({ summary: 'Создание заклинания' })
  @ApiResponse({ status: 200, type: Spell })
  @Post('/')
  async createSpell(@Body() createSpellDto: CreateSpellDto) {
    return await this.spellService.createSpell(createSpellDto);
  }
  
  @ApiOperation({ summary: 'Получение заклинания по id' })
  @ApiResponse({ status: 200, type: Spell })
  @Get('/:spell_id')
  async getSpell(@Param('spell_id') spell_id: number) {
    return await this.spellService.getSpell(spell_id);
  }
  
  @ApiOperation({ summary: 'Обновление заклинания по id' })
  @ApiResponse({ status: 200, type: Spell })
  @Put('/:spell_id')
  async updateSpell(@Body() spell: Spell, @Param('spell_id') spell_id: number) {
    return await this.spellService.updateSpell(spell, spell_id);
  }
  
  
  // Spell Effects
  @ApiOperation({ summary: 'Создание эффекта заклинания' })
  @ApiResponse({ status: 200, type: Effect })
  @Post('/:spell_id/effect')
  async createSpellEffect(@Body() createSpellEffectDto: CreateSpellEffectDto, @Param('spell_id') spell_id: number) {
    return await this.spellService.createSpellEffect(createSpellEffectDto, spell_id);
  }
  
  @ApiOperation({ summary: 'Получение эффектов заклинания' })
  @ApiResponse({ status: 200, type: [Effect] })
  @Get('/:spell_id/effect')
  async getSpellEffect(@Param('spell_id') spell_id: number) {
    return await this.spellService.getSpellEffect(spell_id);
  }
  
  @ApiOperation({ summary: 'Обновление эффекта заклинания по effect_id' })
  @ApiResponse({ status: 200, type: Spell })
  @Put('/:spell_id/effect/:effect_id')
  async updateSpellEffect(@Body() spellEffect: SpellEffect, @Param('effect_id') effect_id: number, @Param('spell_id') spell_id: number) {
    return await this.spellService.updateSpellEffect(spellEffect, effect_id, spell_id);
  }
  
  @ApiOperation({ summary: 'Удаление эффекта заклинания по effect_id' })
  @ApiResponse({ status: 200 })
  @Delete('/:spell_id/effect/:effect_id')
  async deleteSpellEffect(@Param('effect_id') effect_id: number, @Param('spell_id') spell_id: number) {
    return await this.spellService.deleteSpellEffect(effect_id, spell_id);
  }
}
