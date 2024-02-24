import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero, HeroItem, HeroLvl, HeroStats, HeroTechnique } from './hero.model';
import { HeroSkills } from './hero-skills.model';
import { CreateHeroDto } from './dto/create-hero.dto';
import { CreateHeroTechniqueDto } from './dto/create-hero-technique';
import { CreateHeroItemDto } from './dto/create-hero-item';
import { exp_reward } from '../../common/utils/exp_reward';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero) private heroesRepository: Repository<Hero>,
    @InjectRepository(HeroStats) private heroStatsRepository: Repository<HeroStats>,
    @InjectRepository(HeroSkills) private heroSkillsRepository: Repository<HeroSkills>,
    @InjectRepository(HeroLvl) private heroLvlRepository: Repository<HeroLvl>,
    @InjectRepository(HeroTechnique) private heroTechniquesRepository: Repository<HeroTechnique>,
    @InjectRepository(HeroItem) private heroItemsRepository: Repository<HeroItem>,
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
  
  async updateHeroMoney(hero_id: number, money: number) {
    const hero = await this.heroesRepository.findOneBy({ id: hero_id });
    console.log('GETMONEY, ', money);
    console.log('ADDMONEY, ', hero.money + money);
    if (hero.money + money >= 0) {
      return this.heroesRepository.update({ id: hero_id }, { ...hero, money: hero.money + money });
    } else {
      throw new ConflictException('Недостаточно средств');
    }
  }
  
  async getHeroes() {
    return await this.heroesRepository.find();
  }
  
  async getHeroStats(hero_id: number) {
    return await this.heroStatsRepository.findOneBy({ hero_id });
  }
  
  async getHeroSkills(hero_id: number) {
    return await this.heroSkillsRepository.findOneBy({ hero_id });
  }
  
  
  // Lvl
  async getHeroLvl(hero_id: number) {
    return this.heroLvlRepository
      .createQueryBuilder('hero_level')
      .innerJoin('hero_level.level', 'levels')
      .addSelect(['levels.exp_to_lvl', 'levels.exp_total'])
      .where({ hero_id: hero_id })
      .getOne();
  }
  
  async updateHeroExp(hero_id: number, enemy_lvl: number, exp: number) {
    const lvl = await this.heroLvlRepository.findOneBy({ hero_id: hero_id });
    const new_exp = exp_reward(lvl.exp, exp, enemy_lvl);
    
    await this.heroLvlRepository.update({ hero_id: hero_id }, { ...lvl, exp: new_exp });
    
    return new_exp - lvl.exp;
  }
  
  
  // Technique
  async getHeroTechniques(hero_id: number) {
    const techniques = await this.heroTechniquesRepository.find({
      relations: ['technique', 'technique.effects'],
      where: { hero_id: hero_id },
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
  
  // Item
  async getHeroItems(hero_id: number) {
    const items = await this.heroItemsRepository.find({
      relations: ['item'],
      where: { hero_id: hero_id },
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
}
