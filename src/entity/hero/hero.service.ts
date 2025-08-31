import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero, HeroItem, HeroLvl, HeroStats, HeroTechnique, HeroWeapon } from './hero.model';
import { HeroSkills } from './hero-skills.model';
import { CreateHeroDto } from './dto/create-hero.dto';
import { CreateHeroTechniqueDto } from './dto/create-hero-technique';
import { CreateHeroItemDto } from './dto/create-hero-item';
import { reward } from '../../common/utils/reward';
import { HeroSpell } from './hero-spell.model';
import { CreateHeroSpellDto } from './dto/create-hero-spell';
import { CreateHeroWeaponDto } from './dto/create-hero-weapon';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero) private heroesRepository: Repository<Hero>,
    @InjectRepository(HeroStats) private heroStatsRepository: Repository<HeroStats>,
    @InjectRepository(HeroSkills) private heroSkillsRepository: Repository<HeroSkills>,
    @InjectRepository(HeroLvl) private heroLvlRepository: Repository<HeroLvl>,
    @InjectRepository(HeroTechnique) private heroTechniquesRepository: Repository<HeroTechnique>,
    @InjectRepository(HeroSpell) private heroSpellsRepository: Repository<HeroSpell>,
    @InjectRepository(HeroItem) private heroItemsRepository: Repository<HeroItem>,
    @InjectRepository(HeroWeapon) private heroWeaponRepository: Repository<HeroWeapon>,
  ) {
  }
  
  async createHero(dto: CreateHeroDto) {
    let hero = this.heroesRepository.create(dto);
    return await this.heroesRepository.save(hero);
  }
  
  async getHero(hero_id?: number) {
    return await this.heroesRepository.findOne({
      relations: ['class', 'race', 'user'],
      where: { id: hero_id },
    });
  }
  
  async updateHero(data: CreateHeroDto, hero_id: number) {
    return this.heroesRepository.update({ id: hero_id }, { ...data, id: hero_id });
  }
  
  async updateHeroMoney(hero_id: number, money: number, enemy_lvl?: number, is_update?: boolean) {
    const hero = await this.heroesRepository.findOneBy({ id: hero_id });
    
    const new_money = reward(hero.money, money, enemy_lvl, 'money');
    const add_money = new_money - hero.money;
    
    console.log('GET_MONEY, ', money);
    console.log('ADD_MONEY, ', add_money);
    console.log('TOTAL_MONEY, ', new_money);
    
    if (hero.money + money >= 0) {
      if (is_update) await this.heroesRepository.update({ id: hero_id }, { ...hero, money: hero.money + money });
      return add_money;
    } else {
      throw new ConflictException('Недостаточно средств');
    }
  }
  
  async getHeroes() {
    return await this.heroesRepository.find({ cache: false });
  }
  
  async getHeroStats(hero_id: number) {
    return await this.heroStatsRepository.findOne({
      where: { hero_id },
    });
  }
  
  async getHeroSkills(hero_id: number) {
    return await this.heroSkillsRepository.findOne({
      where: { hero_id },
    });
  }
  
  
  // Lvl
  async getHeroLvl(hero_id: number) {
    const lvl = await this.heroLvlRepository
      .createQueryBuilder('hero_levels')
      .innerJoin('hero_levels.level', 'levels')
      .addSelect(['levels.exp_to_lvl', 'levels.exp_total'])
      .where({ hero_id: hero_id })
      .cache(false)
      .getOne();
    
    return lvl;
  }
  
  async updateHeroExp(hero_id: number, enemy_lvl: number, exp: number, is_update?: boolean) {
    const hero_lvl = await this.heroLvlRepository.findOneBy({ hero_id: hero_id });
    
    let new_exp = reward(hero_lvl.exp, exp, enemy_lvl, 'exp');
    if (hero_lvl.lvl >= 360) new_exp = hero_lvl.exp;
    
    if (is_update) await this.heroLvlRepository.update({ hero_id: hero_id }, { ...hero_lvl, exp: new_exp });
    
    return new_exp - hero_lvl.exp;
  }
  
  
  // Technique
  async getHeroTechniques(hero_id: number) {
    const techniques = await this.heroTechniquesRepository.find({
      relations: ['technique', 'technique.effects'],
      where: { hero_id: hero_id },
      cache: false,
    });
    
    if (!techniques) {
      throw new HttpException('Техника не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return techniques;
  }
  
  async getHeroTechnique(hero_id: number, technique_id: number) {
    const technique = await this.heroTechniquesRepository.findOne({
      relations: ['technique'],
      where: { technique_id: technique_id, hero_id: hero_id },
    });
    
    if (!technique) {
      throw new HttpException('Техника не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return technique;
  }
  
  async createHeroTechnique(data: CreateHeroTechniqueDto, hero_id: number) {
    const technique = this.heroTechniquesRepository.create({ ...data, hero_id: hero_id });
    return this.heroTechniquesRepository.save(technique);
  }
  
  async deleteHeroTechnique(hero_id: number, technique_id: number) {
    return this.heroTechniquesRepository.delete({ hero_id: hero_id, technique_id: technique_id });
  }
  
  
  // Spell
  async getHeroSpells(hero_id: number) {
    const spells = await this.heroSpellsRepository.find({
      relations: ['spell', 'spell.effects'],
      where: { hero_id: hero_id },
      cache: false,
    });
    
    if (!spells) {
      throw new HttpException('Техника не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return spells;
  }
  
  async getHeroSpell(hero_id: number, spell_id: number) {
    const spells = await this.heroSpellsRepository.findOne({
      relations: ['spell'],
      where: { spell_id: spell_id, hero_id: hero_id },
      cache: false,
    });
    
    if (!spells) {
      throw new HttpException('Техника не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return spells;
  }
  
  async createHeroSpell(data: CreateHeroSpellDto, hero_id: number) {
    const technique = this.heroSpellsRepository.create({ ...data, hero_id: hero_id });
    return this.heroSpellsRepository.save(technique);
  }
  
  async deleteHeroSpell(hero_id: number, spell_id: number) {
    return !!await this.heroSpellsRepository.delete({ hero_id: hero_id, spell_id: spell_id });
  }
  
  
  // Item
  async getHeroItems(hero_id: number) {
    const items = await this.heroItemsRepository.find({
      relations: ['item'],
      where: { hero_id: hero_id },
      cache: false,
    });
    
    if (!items) {
      throw new HttpException('Предметы не найдены', HttpStatus.BAD_REQUEST);
    }
    
    return items;
  }
  
  async getHeroItem(hero_id: number, item_id: number) {
    const item = await this.heroItemsRepository.findOne({
      relations: ['technique'],
      where: { item_id: item_id, hero_id: hero_id },
      cache: false,
    });
    
    if (!item) {
      throw new HttpException('Предмет не найден', HttpStatus.BAD_REQUEST);
    }
    
    return item;
  }
  
  async createHeroItem(data: CreateHeroItemDto, hero_id: number) {
    this.heroItemsRepository.findOneBy({ item_id: data.item_id, hero_id: hero_id }).then((item) => {
      if (item?.item_id && item.is_stack) {
        item.count += data.count;
        this.heroItemsRepository.update({ item_id: item.item_id, hero_id: item.hero_id }, { ...item, hero_id: hero_id });
      } else {
        const item = this.heroItemsRepository.create({ ...data, hero_id: hero_id });
        return this.heroItemsRepository.save(item);
      }
    });
  }
  
  async createHeroItems(data: [CreateHeroItemDto], hero_id: number) {
    data.forEach((item) => {
      this.createHeroItem(item, hero_id);
    });
  }
  
  async deleteHeroItem(hero_id: number, item_id: number) {
    return this.heroItemsRepository.delete({ hero_id: hero_id, item_id: item_id });
  }
  
  
  // Weapon
  async getHeroWeapon(hero_id: number) {
    const weapons = await this.heroWeaponRepository.findOne({
      relations: ['item'],
      where: { hero_id: hero_id },
      cache: false,
    });
    
    if (!weapons) throw new HttpException('Техника не найдена', HttpStatus.BAD_REQUEST);
    
    return weapons;
  }
  
  async createHeroWeapon(data: CreateHeroWeaponDto, hero_id: number) {
    const technique = this.heroWeaponRepository.create({ ...data, hero_id: hero_id });
    return this.heroWeaponRepository.save(technique);
  }
  
  async deleteHeroWeapon(hero_id: number, weapon_id: number) {
    return !!await this.heroWeaponRepository.delete({ hero_id: hero_id, weapon_id: weapon_id });
  }
}
