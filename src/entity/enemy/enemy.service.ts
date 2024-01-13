import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enemy, EnemyStats, EnemyTechnique, EnemyWeapon } from './enemy.model';
import { CreateEnemyDto } from './dto/create-enemy';
import { CreateEnemyStatsDto } from './dto/create-enemy-stats';
import { CreateEnemyWeaponDto } from './dto/create-enemy-weapon';
import { CreateEnemyTechniqueDto } from './dto/create-enemy-technique';

@Injectable()
export class EnemyService {
  constructor(
    @InjectRepository(Enemy) private enemiesRepository: Repository<Enemy>,
    @InjectRepository(EnemyStats) private enemyStatsRepository: Repository<EnemyStats>,
    @InjectRepository(EnemyWeapon) private enemyWeaponRepository: Repository<EnemyWeapon>,
    @InjectRepository(EnemyTechnique) private enemyTechniqueRepository: Repository<EnemyTechnique>,
  ) {
  }
  
  async getEnemy(enemy_id: number) {
    const enemy = await this.enemiesRepository.findOneBy({ id: enemy_id });
    
    if (!enemy) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return enemy;
  }
  
  async getEnemies() {
    return await this.enemiesRepository.find();
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
    return await this.enemyStatsRepository.findOneBy({ enemy_id: enemy_id });
  }
  
  async createEnemyStats(data: CreateEnemyStatsDto, enemy_id: number) {
    const stats = this.enemyStatsRepository.create({ ...data, enemy_id: enemy_id });
    return this.enemyStatsRepository.save(stats);
  }
  
  async editEnemyStats(data: CreateEnemyStatsDto, enemy_id: number) {
    return this.enemyStatsRepository.update({ enemy_id: enemy_id }, data);
  }
  
  async deleteEnemyStats(enemy_id: number) {
    return this.enemyStatsRepository.delete({ enemy_id: enemy_id });
  }
  
  
  // Weapon
  async getEnemyWeapon(enemy_id: number) {
    return await this.enemyWeaponRepository.findOneBy({ enemy_id: enemy_id }) || {}
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
    return await this.enemyTechniqueRepository.findBy({ enemy_id: enemy_id });
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
}
