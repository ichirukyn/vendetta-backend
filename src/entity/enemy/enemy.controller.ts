import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Enemy, EnemyItem, EnemyTechnique, EnemyWeapon } from './enemy.model';
import { EnemyService } from './enemy.service';
import { CreateEnemyDto } from './dto/create-enemy';
import { CreateEnemyStatsDto } from './dto/create-enemy-stats';
import { CreateEnemyWeaponDto } from './dto/create-enemy-weapon';
import { CreateEnemyTechniqueDto } from './dto/create-enemy-technique';
import { EnemyStats } from './enemy-stats.model';
import { EnemyTeam } from './enemy-team';
import { CreateEnemyItemDto } from './dto/create-enemy-item';

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
  
  @ApiOperation({ summary: 'Получение техники противника по id' })
  @ApiResponse({ status: 200, type: EnemyTechnique })
  @Get('/:enemy_id/technique/:technique_id')
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
  
  
  // Item
  @ApiOperation({ summary: 'Получение списка предметов противника' })
  @ApiResponse({ status: 200, type: [EnemyItem] })
  @Get('/:enemy_id/item')
  async getEnemyItems(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.getEnemyItems(enemy_id);
  }
  
  @ApiOperation({ summary: 'Получение списка предметов противника' })
  @ApiResponse({ status: 200, type: [EnemyItem] })
  @Get('/:enemy_id/loot')
  async getEnemyLoot(@Param('enemy_id') enemy_id: number, @Query('hero_id') hero_id: number | undefined) {
    return await this.enemyService.getEnemyLoot(enemy_id, hero_id);
  }
  
  @ApiOperation({ summary: 'Получение предмета противника по id' })
  @ApiResponse({ status: 200, type: EnemyItem })
  @Get('/:enemy_id/item/:item_id')
  async getEnemyItem(@Param('enemy_id') enemy_id: number, @Param('item_id') item_id: number) {
    return await this.enemyService.getEnemyItem(enemy_id, item_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета противника' })
  @ApiResponse({ status: 200, type: EnemyItem })
  @Post('/:enemy_id/item')
  async createEnemyItem(@Body() createEnemyItemDto: CreateEnemyItemDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.createEnemyItem(createEnemyItemDto, enemy_id);
  }
  
  @ApiOperation({ summary: 'Обновление предмета противника' })
  @ApiResponse({ status: 200, type: EnemyItem })
  @Put('/:enemy_id/item/:loot_id')
  async editEnemyItem(@Body() createEnemyItemDto: CreateEnemyItemDto, @Param('enemy_id') enemy_id: number, @Param('loot_id') loot_id: number) {
    return await this.enemyService.editEnemyItem(createEnemyItemDto, enemy_id, loot_id);
  }
  
  @ApiOperation({ summary: 'Удаление предмета противника' })
  @ApiResponse({ status: 200 })
  @Delete('/:enemy_id/item/:item_id')
  async deleteEnemyItem(@Param('enemy_id') enemy_id: number, @Param('item_id') item_id: number) {
    return await this.enemyService.deleteEnemyItem(enemy_id, item_id);
  }
  
  
  // Team
  @ApiOperation({ summary: 'Получение списка предметов противника' })
  @ApiResponse({ status: 200, type: [EnemyTeam] })
  @Get('/:enemy_id/team')
  async getEnemyTeams(@Param('enemy_id') enemy_id: number) {
    return await this.enemyService.getEnemyTeams(enemy_id);
  }
  
  @ApiOperation({ summary: 'Получение списка предметов противника' })
  @ApiResponse({ status: 200, type: EnemyTeam })
  @Get('/:enemy_id/team/:team_id')
  async getEnemyTeam(@Param('enemy_id') enemy_id: number, @Param('team_id') team_id: number) {
    return await this.enemyService.getEnemyTeam(enemy_id, team_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета противника' })
  @ApiResponse({ status: 200, type: EnemyTeam })
  @Post('/:enemy_id/team')
  async createEnemyTeam(@Body() createEnemyTechniqueDto: CreateEnemyTechniqueDto, @Param('enemy_id') enemy_id: number) {
    return await this.enemyService.createEnemyTeam(createEnemyTechniqueDto, enemy_id);
  }
  
  @ApiOperation({ summary: 'Обновление предмета противника' })
  @ApiResponse({ status: 200, type: EnemyTeam })
  @Put('/:enemy_id/team/:team_id')
  async editEnemyTeam(@Body() createEnemyTechniqueDto: CreateEnemyTechniqueDto, @Param('enemy_id') enemy_id: number, @Param('team_id') team_id: number) {
    return await this.enemyService.editEnemyTeam(createEnemyTechniqueDto, enemy_id, team_id);
  }
  
  @ApiOperation({ summary: 'Удаление противника из команды' })
  @ApiResponse({ status: 200 })
  @Delete('/:enemy_id/team/:team_id')
  async deleteEnemyTeam(@Param('enemy_id') enemy_id: number, @Param('team_id') team_id: number) {
    return await this.enemyService.deleteEnemyTeam(enemy_id, team_id);
  }
}
