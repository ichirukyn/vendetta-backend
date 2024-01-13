import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero, HeroLvl, HeroStats, HeroTechnique } from './hero.model';
import { HeroSkills } from './hero-skills.model';
import { CreateHeroDto } from './dto/create-hero.dto';
import { CreateHeroTechniqueDto } from './dto/create-hero-technique';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero) private heroesRepository: Repository<Hero>,
    @InjectRepository(HeroStats) private heroStatsRepository: Repository<HeroStats>,
    @InjectRepository(HeroSkills) private heroSkillsRepository: Repository<HeroSkills>,
    @InjectRepository(HeroLvl) private heroLvlRepository: Repository<HeroLvl>,
    @InjectRepository(HeroTechnique) private heroTechniquesRepository: Repository<HeroTechnique>,
  ) {
  }
  
  async createHero(dto: CreateHeroDto) {
    let user = this.heroesRepository.create(dto);
    return await this.heroesRepository.save(user);
  }
  
  async getHero(hero_id?: number, user_id?: number) {
    if (user_id && user_id != 0) return await this.heroesRepository.findOneBy({ user_id: user_id });
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
  
  // Technique
  async getHeroTechniques(hero_id: number) {
    const techniques = await this.heroTechniquesRepository.createQueryBuilder('ht')
      .leftJoinAndSelect('ht.technique_id', 'technique')
      .select(['*'])
      .where('ht.hero_id = :hero_id', { hero_id: hero_id })
      .getRawMany();
    
    if (!techniques) {
      throw new HttpException('Техника не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return techniques;
  }
  
  async getHeroTechnique(hero_id: number, technique_id: number) {
    const technique = await this.heroTechniquesRepository.createQueryBuilder('ht')
      .leftJoinAndSelect('ht.technique_id', 'technique')
      .select(['*'])
      .where('ht.hero_id = :hero_id', { hero_id: hero_id })
      .andWhere('ht.technique_id = :technique_id', { technique_id: technique_id })
      .getRawOne();
    
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
}
