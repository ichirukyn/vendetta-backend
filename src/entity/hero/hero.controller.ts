import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { HeroSkills } from './hero-skills.model';
import { Hero, HeroLvl, HeroStats } from './hero.model';
import { User } from '../users/user.model';
import { CreateHeroDto } from './dto/create-hero.dto';

@ApiTags('Hero')
@Controller('/hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}
  
  @ApiOperation({ summary: 'Создание героя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() createHeroDto: CreateHeroDto) {
    return await this.heroService.createHero(createHeroDto);
  }

  @ApiOperation({ summary: 'Получение героя по user_id' })
  @ApiResponse({ status: 200, type: Hero })
  @Get(':hero_id')
  async getHero(@Param('hero_id') hero_id: number, @Query('user_id') user_id: number) {
    return await this.heroService.getHero(hero_id, user_id);
  }

  @ApiOperation({ summary: 'Получение списка героев' })
  @ApiResponse({ status: 200, type: [Hero] })
  @Get()
  async getHeroes() {
    return await this.heroService.getHeroes();
  }

  @ApiOperation({ summary: 'Получение списка статуса героя' })
  @ApiResponse({ status: 200, type: [HeroStats] })
  @Get('/:hero_id/stats')
  async getHeroStats(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroStats(hero_id);
  }

  @ApiOperation({ summary: 'Получение списка статуса героя' })
  @ApiResponse({ status: 200, type: [HeroSkills] })
  @Get('/:hero_id/skills')
  async getHeroSkills(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroSkills(hero_id);
  }

  @ApiOperation({ summary: 'Получение уровня героя' })
  @ApiResponse({ status: 200, type: [HeroLvl] })
  @Get('/:hero_id/lvl')
  async getHeroLvl(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroLvl(hero_id);
  }
}
