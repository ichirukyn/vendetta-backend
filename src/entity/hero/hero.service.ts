import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero, HeroLvl, HeroStats } from './hero.model';
import { HeroSkills } from './hero-skills.model';
import { HeroTechniques } from './hero-technique.model';
import { CreateHeroDto } from './dto/create-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero) private heroesRepository: Repository<Hero>,
    @InjectRepository(HeroStats) private heroStatsRepository: Repository<HeroStats>,
    @InjectRepository(HeroSkills) private heroSkillsRepository: Repository<HeroSkills>,
    @InjectRepository(HeroLvl) private heroLvlRepository: Repository<HeroLvl>,
    @InjectRepository(HeroTechniques) private heroTechniquesRepository: Repository<HeroTechniques>,
  ) {
  }
  
  async createHero(dto: CreateHeroDto) {
    let user = this.heroesRepository.create(dto);
    return await this.heroesRepository.save(user);
  }
  
  async getHero(hero_id?: number, user_id?: number) {
    if (user_id) return await this.heroesRepository.findOneBy({ user_id: user_id });
    if (hero_id) return await this.heroesRepository.findOneBy({ id: hero_id });
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
  
  async getHeroLvl(hero_id: number) {
    return this.heroLvlRepository
      .createQueryBuilder('hero_level')
      .innerJoin('hero_level.level', 'levels')
      .addSelect(['levels.exp_to_lvl', 'levels.exp_total'])
      .where({ hero_id: hero_id })
      .getOne();
  }
  
  async getHeroTechniques(hero_id: number) {
    return await this.heroTechniquesRepository.findOneBy({ hero_id });
  }
}
