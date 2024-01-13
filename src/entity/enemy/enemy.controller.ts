import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Enemy, EnemyStats, EnemyTechnique, EnemyWeapon } from './enemy.model';
import { EnemyService } from './enemy.service';
import { CreateEnemyDto } from './dto/create-enemy';
import { CreateEnemyStatsDto } from './dto/create-enemy-stats';
import { CreateEnemyWeaponDto } from './dto/create-enemy-weapon';
import { CreateEnemyTechniqueDto } from './dto/create-enemy-technique';

@ApiTags('Enemy')
@Controller('/enemy')
export class EnemyController {
  constructor(private readonly enemyService: EnemyService) {
  }
  
  @ApiOperation({ summary: 'Получение списка противников' })
  @ApiResponse({ status: 200, type: [Enemy] })
  @Get('/')
  async getEnemies() {
    return await this.enemyService.getEnemies();
  }
  
  @ApiOperation({ summary: 'Получение противника по id' })
  @ApiResponse({ status: 200, type: Enemy })
  @Get('/:enemy_id')
  async getEnemy(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.getEnemy(enemy_id);
  }
  
  @ApiOperation({ summary: 'Создание противника' })
  @ApiResponse({ status: 200, type: Enemy })
  @Post('/')
  async createEnemy(@Body() createEnemyDto: CreateEnemyDto) {
    return await this.enemyService.createEnemy(createEnemyDto);
  }
  
  @ApiOperation({ summary: 'Обновление противника' })
  @ApiResponse({ status: 200, type: Enemy })
  @Put('/:enemy_id')
  async editEnemy(@Body() createEnemyDto: CreateEnemyDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.editEnemy(createEnemyDto, enemy_id);
  }
  
  @ApiOperation({ summary: 'Удаление противника' })
  @ApiResponse({ status: 200 })
  @Delete('/:enemy_id')
  async deleteEnemy(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.deleteEnemy(enemy_id);
  }
  
  
  // Stats
  @ApiOperation({ summary: 'Получение характеристик противника по id' })
  @ApiResponse({ status: 200, type: EnemyStats })
  @Get('/:enemy_id/stats')
  async getEnemyStats(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.getEnemyStats(enemy_id);
  }
  
  @ApiOperation({ summary: 'Создание характеристик противника' })
  @ApiResponse({ status: 200, type: EnemyStats })
  @Post('/:enemy_id/stats')
  async createEnemyStats(@Body() createEnemyStatsDto: CreateEnemyStatsDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.createEnemyStats(createEnemyStatsDto, enemy_id);
  }
  
  @ApiOperation({ summary: 'Обновление характеристик противника' })
  @ApiResponse({ status: 200, type: EnemyStats })
  @Put('/:enemy_id/stats')
  async editEnemyStats(@Body() createEnemyStatsDto: CreateEnemyStatsDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.editEnemyStats(createEnemyStatsDto, enemy_id);
  }
  
  @ApiOperation({ summary: 'Удаление характеристик противника' })
  @ApiResponse({ status: 200 })
  @Delete('/:enemy_id/stats')
  async deleteEnemyStats(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.deleteEnemyStats(enemy_id);
  }
  
  
  // Weapon
  @ApiOperation({ summary: 'Получение характеристик противника по id' })
  @ApiResponse({ status: 200, type: EnemyWeapon })
  @Get('/:enemy_id/weapon')
  async getEnemyWeapon(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.getEnemyWeapon(enemy_id);
  }
  
  @ApiOperation({ summary: 'Создание характеристик противника' })
  @ApiResponse({ status: 200, type: EnemyWeapon })
  @Post('/:enemy_id/weapon')
  async createEnemyWeapon(@Body() createEnemyWeaponDto: CreateEnemyWeaponDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.createEnemyWeapon(createEnemyWeaponDto, enemy_id);
  }
  
  @ApiOperation({ summary: 'Обновление характеристик противника' })
  @ApiResponse({ status: 200, type: EnemyWeapon })
  @Put('/:enemy_id/weapon')
  async editEnemyWeapon(@Body() createEnemyWeaponDto: CreateEnemyWeaponDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.editEnemyWeapon(createEnemyWeaponDto, enemy_id);
  }
  
  
  // Technique
  @ApiOperation({ summary: 'Получение списка противников' })
  @ApiResponse({ status: 200, type: [EnemyTechnique] })
  @Get('/:enemy_id/technique')
  async getEnemyTechniques(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.getEnemyTechniques(enemy_id);
  }
  
  @ApiOperation({ summary: 'Получение характеристик противника по id' })
  @ApiResponse({ status: 200, type: EnemyTechnique })
  @Get('/:enemy_id/technique/:item_id')
  async getEnemyTechnique(@Param('enemy_id') enemy_id: number, @Param('technique_id') technique_id: number) {
    return await this.enemyService.getEnemyTechnique(enemy_id, technique_id);
  }
  
  @ApiOperation({ summary: 'Создание техники противника' })
  @ApiResponse({ status: 200, type: EnemyTechnique })
  @Post('/:enemy_id/technique')
  async createEnemyTechnique(@Body() createEnemyTechniqueDto: CreateEnemyTechniqueDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.createEnemyTechnique(createEnemyTechniqueDto, enemy_id);
  }
  
  @ApiOperation({ summary: 'Обновление характеристик противника' })
  @ApiResponse({ status: 200, type: EnemyTechnique })
  @Put('/:enemy_id/technique/:technique_id')
  async editEnemyTechnique(@Body() createEnemyTechniqueDto: CreateEnemyTechniqueDto, @Param('enemy_id') enemy_id: number, @Param('technique_id') technique_id: number) {
    return await this.enemyService.editEnemyTechnique(createEnemyTechniqueDto, enemy_id, technique_id);
  }
  
  @ApiOperation({ summary: 'Удаление противника' })
  @ApiResponse({ status: 200 })
  @Delete('/:enemy_id/technique/:technique_id')
  async deleteEnemyTechnique(@Param('enemy_id') enemy_id: number, @Param('technique_id') technique_id: number) {
    return await this.enemyService.deleteEnemyTechnique(enemy_id, technique_id);
  }
}