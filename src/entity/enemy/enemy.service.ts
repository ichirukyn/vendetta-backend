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
import { EnemyTeam } from './enemy-team';
import { CreateEnemyItemDto } from './dto/create-enemy-item';
import { LootDto } from './dto/loot-dto';

@Injectable()
export class EnemyService {
  constructor(
    @InjectRepository(Enemy) private enemiesRepository: Repository<Enemy>,
    @InjectRepository(EnemyStats) private enemyStatsRepository: Repository<EnemyStats>,
    @InjectRepository(EnemyWeapon) private enemyWeaponRepository: Repository<EnemyWeapon>,
    @InjectRepository(EnemyTechnique) private enemyTechniqueRepository: Repository<EnemyTechnique>,
    @InjectRepository(EnemyItem) private enemyItemRepository: Repository<EnemyItem>,
    @InjectRepository(EnemyTeam) private enemyTeamRepository: Repository<EnemyTeam>,
    @Inject(HeroService) private heroService: HeroService,
  ) {
  }
  
  async getEnemy(enemy_id: number) {
    const enemy = await this.enemiesRepository.findOne({
      relations: ['race', 'class', 'stats'],
      where: { id: enemy_id },
      order: { stats: { lvl: 'asc' } },
    });
    
    if (!enemy) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return enemy;
  }
  
  async getEnemies() {
    return await this.enemiesRepository.find({
      relations: ['race', 'class', 'stats'],
      order: { stats: { lvl: 'asc' } },
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
  
  async getEnemyLoot(enemy_id: number, data: LootDto) {
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
        
        const is_update = !!data?.hero_id;
        
        if (item.item.id === 0) {
          item.gold = item.count;
          item.count = 0;
        }
        
        // Если предмет "золото", тогда добавить игроку золото и опыт..
        if (item.item.id === 0) {
          let lvl = data?.enemy_lvl ?? 0;
          
          if (!data?.enemy_lvl) {
            const enemy = await this.enemyStatsRepository.findOneBy({ enemy_id: enemy_id });
            lvl = enemy.lvl;
          }
          
          item.gold = await this.heroService.updateHeroMoney(data?.hero_id, item.gold, lvl, is_update);
          item.exp = await this.heroService.updateHeroExp(data?.hero_id, lvl, item.exp, is_update);
        }
        
        if (is_update) {
          let newItem: CreateHeroItemDto = {
            hero_id: data?.hero_id,
            count: item.count,
            item_id: item.item_id,
            is_stack: true,
            is_transfer: false,
          };
          
          // Добавить или создать предмет игроку
          if (item.count) await this.heroService.createHeroItem(newItem, data?.hero_id);
          
          lootList.push(item);
        } else {
          lootList.push(item);
        }
      }
    }
    
    return lootList;
  }
  
  // Item
  async getEnemyItem(enemy_id: number, item_id: number) {
    return await this.enemyItemRepository.findOneBy({ enemy_id: enemy_id, item_id: item_id });
  }
  
  async createEnemyItem(data: CreateEnemyItemDto, enemy_id: number) {
    const technique = this.enemyItemRepository.create({ ...data, enemy_id: enemy_id });
    return this.enemyItemRepository.save(technique);
  }
  
  async editEnemyItem(data: CreateEnemyItemDto, enemy_id: number, loot_id: number) {
    return this.enemyItemRepository.update({ enemy_id: enemy_id, id: loot_id || data.id }, data);
  }
  
  async deleteEnemyItem(enemy_id: number, item_id: number) {
    return this.enemyItemRepository.delete({ enemy_id: enemy_id, item_id: item_id });
  }
  
  
  // Team
  async getEnemyTeams(enemy_id: number) {
    return await this.enemyTeamRepository.findBy({ enemy_id: enemy_id });
  }
  
  async getEnemyTeam(enemy_id: number, team_id: number) {
    return await this.enemyTeamRepository.findOneBy({ enemy_id: enemy_id, team_id: team_id });
  }
  
  async createEnemyTeam(data: CreateEnemyTechniqueDto, enemy_id: number) {
    const technique = this.enemyTeamRepository.create({ ...data, enemy_id: enemy_id });
    return this.enemyTeamRepository.save(technique);
  }
  
  async editEnemyTeam(data: CreateEnemyTechniqueDto, enemy_id: number, team_id: number) {
    return this.enemyTeamRepository.update({ enemy_id: enemy_id, team_id: team_id }, data);
  }
  
  async deleteEnemyTeam(enemy_id: number, team_id: number) {
    return this.enemyTeamRepository.delete({ enemy_id: enemy_id, team_id: team_id });
  }
}
