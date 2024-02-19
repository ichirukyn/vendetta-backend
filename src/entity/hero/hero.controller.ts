import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { HeroSkills } from './hero-skills.model';
import { Hero, HeroItem, HeroLvl, HeroStats, HeroTechnique } from './hero.model';
import { User } from '../users/user.model';
import { CreateHeroDto } from './dto/create-hero.dto';
import { EnemyTechnique } from '../enemy/enemy.model';
import { CreateHeroTechniqueDto } from './dto/create-hero-technique';
import { CreateHeroItemDto } from './dto/create-hero-item';

@ApiTags('Hero')
@Controller('/hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {
  }
  
  @ApiOperation({ summary: 'Получение списка героев' })
  @ApiResponse({ status: 200, type: [Hero] })
  @Get('/')
  async getHeroes() {
    return await this.heroService.getHeroes();
  }
  
  @ApiOperation({ summary: 'Получение героя по user_id' })
  @ApiResponse({ status: 200, type: Hero })
  @Get('/:hero_id')
  async getHero(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHero(hero_id);
  }
  
  @ApiOperation({ summary: 'Создание героя' })
  @ApiResponse({ status: 200, type: User })
  @Post('/')
  async createUser(@Body() createHeroDto: CreateHeroDto) {
    return await this.heroService.createHero(createHeroDto);
  }
  
  
  // Stats
  @ApiOperation({ summary: 'Получение списка статуса героя' })
  @ApiResponse({ status: 200, type: [HeroStats] })
  @Get('/:hero_id/stats')
  async getHeroStats(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroStats(hero_id);
  }
  
  // Skills
  @ApiOperation({ summary: 'Получение списка статуса героя' })
  @ApiResponse({ status: 200, type: [HeroSkills] })
  @Get('/:hero_id/skills')
  async getHeroSkills(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroSkills(hero_id);
  }
  
  // Lvl
  @ApiOperation({ summary: 'Получение уровня героя' })
  @ApiResponse({ status: 200, type: [HeroLvl] })
  @Get('/:hero_id/lvl')
  async getHeroLvl(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroLvl(hero_id);
  }
  
  
  // Technique
  @ApiOperation({ summary: 'Получение техник игрока' })
  @ApiResponse({ status: 200, type: [HeroTechnique] })
  @Get('/:hero_id/technique')
  async getHeroTechniques(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroTechniques(hero_id);
  }
  
  @ApiOperation({ summary: 'Получение техники по id, игрока' })
  @ApiResponse({ status: 200, type: HeroTechnique })
  @Get('/:hero_id/technique/:technique_id')
  async getHeroTechnique(@Param('hero_id') hero_id: number, @Param('technique_id') technique_id: number) {
    return await this.heroService.getHeroTechnique(hero_id, technique_id);
  }
  
  @ApiOperation({ summary: 'Создание техники игрока' })
  @ApiResponse({ status: 200, type: EnemyTechnique })
  @Post('/:hero_id/technique')
  async createHeroTechnique(@Body() createHeroTechniqueDto: CreateHeroTechniqueDto, @Param('hero_id') hero_id: number) {
    return await this.heroService.createHeroTechnique(createHeroTechniqueDto, hero_id);
  }
  
  @ApiOperation({ summary: 'Создание техники игрока' })
  @ApiResponse({ status: 200, type: EnemyTechnique })
  @Delete('/:hero_id/technique/:technique_id')
  async deleteHeroTechnique(@Param('hero_id') hero_id: number, @Param('technique_id') technique_id: number) {
    return await this.heroService.deleteHeroTechnique(hero_id, technique_id);
  }
  
  
  // Item
  @ApiOperation({ summary: 'Получение предматов игрока' })
  @ApiResponse({ status: 200, type: [HeroItem] })
  @Get('/:hero_id/item')
  async getHeroItems(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroItems(hero_id);
  }
  
  @ApiOperation({ summary: 'Получение предмата по id, игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Get('/:hero_id/item/:technique_id')
  async getHeroItem(@Param('hero_id') hero_id: number, @Param('technique_id') technique_id: number) {
    return await this.heroService.getHeroItem(hero_id, technique_id);
  }
  
  @ApiOperation({ summary: 'Создание предмата игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Post('/:hero_id/item')
  async createHeroItem(@Body() createHeroItemDto: CreateHeroItemDto, @Param('hero_id') hero_id: number) {
    return await this.heroService.createHeroItem(createHeroItemDto, hero_id);
  }
  
  @ApiOperation({ summary: 'Создание предмата игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Post('/:hero_id/items')
  async createHeroItems(@Body() createHeroItemDto: [CreateHeroItemDto], @Param('hero_id') hero_id: number) {
    return await this.heroService.createHeroItems(createHeroItemDto, hero_id);
  }
  
  @ApiOperation({ summary: 'Создание предмата игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Delete('/:hero_id/item/:technique_id')
  async deleteHeroItem(@Param('hero_id') hero_id: number, @Param('technique_id') technique_id: number) {
    return await this.heroService.deleteHeroItem(hero_id, technique_id);
  }
}
