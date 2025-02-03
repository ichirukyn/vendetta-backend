import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { HeroSkills } from './hero-skills.model';
import { Hero, HeroItem, HeroLvl, HeroStats, HeroTechnique, HeroWeapon } from './hero.model';
import { User } from '../users/user.model';
import { CreateHeroDto } from './dto/create-hero.dto';
import { EnemyTechnique } from '../enemy/enemy.model';
import { CreateHeroTechniqueDto } from './dto/create-hero-technique';
import { CreateHeroItemDto } from './dto/create-hero-item';
import { HeroSpell } from './hero-spell.model';
import { CreateHeroSpellDto } from './dto/create-hero-spell';
import { CreateHeroWeaponDto } from './dto/create-hero-weapon';

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
  
  @ApiOperation({ summary: 'Получение героя по user_id' })
  @ApiResponse({ status: 200, type: Hero })
  @Get('/:hero_id')
  async editHero(@Param('hero_id') hero_id: number, @Body() data: CreateHeroDto) {
    return await this.heroService.updateHero(data, hero_id);
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
  
  
  // Spell
  @ApiOperation({ summary: 'Получение заклинаний игрока' })
  @ApiResponse({ status: 200, type: [HeroSpell] })
  @Get('/:hero_id/spell')
  async getHeroSpells(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroSpells(hero_id);
  }
  
  @ApiOperation({ summary: 'Получение заклинания по id, игрока' })
  @ApiResponse({ status: 200, type: HeroSpell })
  @Get('/:hero_id/spell/:spell_id')
  async getHeroSpell(@Param('hero_id') hero_id: number, @Param('spell_id') spell_id: number) {
    return await this.heroService.getHeroSpell(hero_id, spell_id);
  }
  
  @ApiOperation({ summary: 'Создание заклинания игрока' })
  @ApiResponse({ status: 200, type: HeroSpell })
  @Post('/:hero_id/spell')
  async createHeroSpell(@Body() createHeroSpellDto: CreateHeroSpellDto, @Param('hero_id') hero_id: number) {
    return await this.heroService.createHeroSpell(createHeroSpellDto, hero_id);
  }
  
  @ApiOperation({ summary: 'Удаление заклинания игрока' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/:hero_id/spell/:spell_id')
  async deleteHeroSpell(@Param('hero_id') hero_id: number, @Param('spell_id') spell_id: number) {
    return await this.heroService.deleteHeroSpell(hero_id, spell_id);
  }
  
  
  // Item
  @ApiOperation({ summary: 'Получение предметов игрока' })
  @ApiResponse({ status: 200, type: [HeroItem] })
  @Get('/:hero_id/item')
  async getHeroItems(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroItems(hero_id);
  }
  
  @ApiOperation({ summary: 'Получение предмета по id, игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Get('/:hero_id/item/:item_id')
  async getHeroItem(@Param('hero_id') hero_id: number, @Param('item_id') item_id: number) {
    return await this.heroService.getHeroItem(hero_id, item_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Post('/:hero_id/item')
  async createHeroItem(@Body() createHeroItemDto: CreateHeroItemDto, @Param('hero_id') hero_id: number) {
    return await this.heroService.createHeroItem(createHeroItemDto, hero_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Post('/:hero_id/items')
  async createHeroItems(@Body() createHeroItemDto: [CreateHeroItemDto], @Param('hero_id') hero_id: number) {
    return await this.heroService.createHeroItems(createHeroItemDto, hero_id);
  }
  
  @ApiOperation({ summary: 'Удаление предмета игрока' })
  @ApiResponse({ status: 200, type: HeroItem })
  @Delete('/:hero_id/item/:item_id')
  async deleteHeroItem(@Param('hero_id') hero_id: number, @Param('item_id') item_id: number) {
    return await this.heroService.deleteHeroItem(hero_id, item_id);
  }
  
  
  // Weapon
  @ApiOperation({ summary: 'Получение оружия игрока' })
  @ApiResponse({ status: 200, type: HeroWeapon })
  @Get('/:hero_id/weapon')
  async getHeroWeapons(@Param('hero_id') hero_id: number) {
    return await this.heroService.getHeroWeapon(hero_id);
  }
  
  @ApiOperation({ summary: 'Создание оружия игрока' })
  @ApiResponse({ status: 200, type: HeroWeapon })
  @Post('/:hero_id/weapon')
  async createHeroWeapon(@Body() createHeroWeaponDto: CreateHeroWeaponDto, @Param('hero_id') hero_id: number) {
    return await this.heroService.createHeroWeapon(createHeroWeaponDto, hero_id);
  }
  
  @ApiOperation({ summary: 'Удаление оружия игрока' })
  @ApiResponse({ status: 200, type: HeroWeapon })
  @Delete('/:hero_id/weapon/:weapon_id')
  async deleteHeroWeapon(@Param('hero_id') hero_id: number, @Param('weapon_id') weapon_id: number) {
    return await this.heroService.deleteHeroWeapon(hero_id, weapon_id);
  }
}
