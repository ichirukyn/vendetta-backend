import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enemy, EnemyItem, EnemyTechnique, EnemyWeapon } from './enemy.model';
import { CreateEnemyDto } from './dto/create-enemy';
import { CreateEnemyStatsDto } from './dto/create-enemy-stats';
import { CreateEnemyWeaponDto } from './dto/create-enemy-weapon';
import { CreateEnemyTechniqueDto } from './dto/create-enemy-technique';
import { EnemyStats } from './enemy-stats.model';
import { HeroService } from '../hero/hero.service';
import { CreateHeroItemDto } from '../hero/dto/create-hero-item';
import { rangeWithNumber } from '../../common/utils';

@Injectable()
export class EnemyService {
  constructor(
    @InjectRepository(Enemy) private enemiesRepository: Repository<Enemy>,
    @InjectRepository(EnemyStats) private enemyStatsRepository: Repository<EnemyStats>,
    @InjectRepository(EnemyWeapon) private enemyWeaponRepository: Repository<EnemyWeapon>,
    @InjectRepository(EnemyTechnique) private enemyTechniqueRepository: Repository<EnemyTechnique>,
    @InjectRepository(EnemyItem) private enemyItemRepository: Repository<EnemyItem>,
    @Inject(HeroService) private heroService: HeroService,
  ) {
  }
  
  async getEnemy(enemy_id: number) {
    const enemy = await this.enemiesRepository.findOne({
      relations: ['race', 'class'],
      where: { id: enemy_id },
    });
    
    if (!enemy) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return enemy;
  }
  
  async getEnemies() {
    return await this.enemiesRepository.find({
      relations: ['race', 'class', 'stats'],
    });
  }
  
  async createEnemy(data: CreateEnemyDto) {
    const enemy = this.enemiesRepository.create(data);
    return this.enemiesRepository.save(enemy);
  }
  
  async editEnemy(data: CreateEnemyDto, enemy_id: number) {
    return this.enemiesRepository.update({ id: enemy_id }, data);
  }
  
  async deleteEnemy(enemy_id: number) {
    return this.enemiesRepository.delete({ id: enemy_id });
  }
  
  // Stats
  async getEnemyStats(enemy_id: number) {
    return await this.enemyStatsRepository.findOneBy({ enemy: { id: enemy_id } });
  }
  
  async createEnemyStats(data: CreateEnemyStatsDto, enemy_id: number) {
    const stats = this.enemyStatsRepository.create({ ...data, enemy_id: enemy_id });
    return this.enemyStatsRepository.save(stats);
  }
  
  async editEnemyStats(data: CreateEnemyStatsDto, enemy_id: number) {
    let stats = await this.enemyStatsRepository.update({ enemy_id: enemy_id }, data);
    
    if (!stats) {
      stats = await this.enemyStatsRepository.save({ ...stats, enemy_id: enemy_id });
    }
    
    return stats;
  }
  
  async deleteEnemyStats(enemy_id: number) {
    return this.enemyStatsRepository.delete({ enemy_id: enemy_id });
  }
  
  
  // Weapon
  async getEnemyWeapon(enemy_id: number) {
    return await this.enemyWeaponRepository.findOneBy({ enemy_id: enemy_id }) || {};
  }
  
  async createEnemyWeapon(data: CreateEnemyWeaponDto, enemy_id: number) {
    const weapon = this.enemyWeaponRepository.create({ ...data, enemy_id: enemy_id });
    return this.enemyWeaponRepository.save(weapon);
  }
  
  async editEnemyWeapon(data: CreateEnemyWeaponDto, enemy_id: number) {
    return this.enemyWeaponRepository.update({ enemy_id: enemy_id }, data);
  }
  
  
  // Technique
  async getEnemyTechniques(enemy_id: number) {
    return await this.enemyTechniqueRepository.find({
      relations: ['technique', 'technique.effects'],
      where: { enemy_id: enemy_id },
    });
  }
  
  async getEnemyTechnique(enemy_id: number, technique_id: number) {
    return await this.enemyTechniqueRepository.findOneBy({ enemy_id: enemy_id, technique_id: technique_id });
  }
  
  async createEnemyTechnique(data: CreateEnemyTechniqueDto, enemy_id: number) {
    const technique = this.enemyTechniqueRepository.create({ ...data, enemy_id: enemy_id });
    return this.enemyTechniqueRepository.save(technique);
  }
  
  async editEnemyTechnique(data: CreateEnemyTechniqueDto, enemy_id: number, technique_id: number) {
    return this.enemyTechniqueRepository.update({ enemy_id: enemy_id, technique_id: technique_id }, data);
  }
  
  async deleteEnemyTechnique(enemy_id: number, technique_id: number) {
    return this.enemyTechniqueRepository.delete({ enemy_id: enemy_id, technique_id: technique_id });
  }
  
  
  // Items
  async getEnemyItems(enemy_id: number) {
    return await this.enemyItemRepository.find({
      relations: ['item'],
      where: { enemy_id: enemy_id },
    });
  }
  
  async getEnemyLoot(enemy_id: number, hero_id: number) {
    const lootList: EnemyItem[] = [];
    const itemList = await this.enemyItemRepository.find({
      relations: ['item'],
      where: { enemy_id: enemy_id },
    });
    
    for (const item of itemList) {
      let rand = Math.random();
      if (item.chance >= rand) {
        item.count = Math.round(Math.random() * (item.count_max - item.count_min) + item.count_min);
        item.gold = rangeWithNumber(item.gold, 0.1);
        item.exp = rangeWithNumber(item.exp, 0.1);
        
        if (item.item.id === 0) {
          item.gold = item.count;
          item.count = 0;
        }
        
        if (hero_id) {
          let data: CreateHeroItemDto = {
            hero_id: hero_id,
            count: item.count,
            item_id: item.item_id,
            is_stack: true,
            is_transfer: false,
          };
          
          const enemy = await this.enemyStatsRepository.findOneBy({ enemy_id: enemy_id });
          if (item.count) await this.heroService.createHeroItem(data, hero_id);
          await this.heroService.updateHeroMoney(hero_id, item.gold);
          item.exp = await this.heroService.updateHeroExp(hero_id, enemy.lvl, item.exp);
          lootList.push(item);
        } else {
          lootList.push(item);
        }
      }
    }
    
    return lootList;
  }
  
  async getEnemyItem(enemy_id: number, item_id: number) {
    return await this.enemyItemRepository.findOneBy({ enemy_id: enemy_id, item_id: item_id });
  }
  
  async createEnemyItem(data: CreateEnemyTechniqueDto, enemy_id: number) {
    const technique = this.enemyItemRepository.create({ ...data, enemy_id: enemy_id });
    return this.enemyItemRepository.save(technique);
  }
  
  async editEnemyItem(data: CreateEnemyTechniqueDto, enemy_id: number, item_id: number) {
    return this.enemyItemRepository.update({ enemy_id: enemy_id, item_id: item_id }, data);
  }
  
  async deleteEnemyItem(enemy_id: number, item_id: number) {
    return this.enemyItemRepository.delete({ enemy_id: enemy_id, item_id: item_id });
  }
}
