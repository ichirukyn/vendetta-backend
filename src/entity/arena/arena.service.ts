import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArenaFloor } from './arena.model';
import { CreateArenaFloorDto } from './dto/create-floor';
import { ArenaFloorEnemy } from './floor.model';
import { CreateArenaFloorEnemyDto } from './dto/create-floor-enemy';

@Injectable()
export class ArenaFloorService {
  constructor(
    @InjectRepository(ArenaFloor) private floorsRepository: Repository<ArenaFloor>,
    @InjectRepository(ArenaFloorEnemy) private floorsEnemyRepository: Repository<ArenaFloorEnemy>,
  ) {
  }
  
  async getArenaFloor(floor_id: number) {
    const floor = await this.floorsRepository.findOne({
      relations: ['enemies', 'enemies.enemy', 'enemies.enemy.race', 'enemies.enemy.class', 'enemies.enemy.stats'],
      where: { id: floor_id },
      order: { id: 'asc' },
    });
    
    if (!floor) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return floor;
  }
  
  async getArenaFloors() {
    return await this.floorsRepository.find({
      relations: ['enemies', 'enemies.enemy', 'enemies.enemy.race', 'enemies.enemy.class', 'enemies.enemy.stats'],
      order: { id: 'asc' },
    });
  }
  
  async createArenaFloor(data: CreateArenaFloorDto) {
    const floor = this.floorsRepository.create(data);
    return this.floorsRepository.save(floor);
  }
  
  async editArenaFloor(data: CreateArenaFloorDto, floor_id: number) {
    return this.floorsRepository.update({ id: floor_id }, { ...data, id: floor_id });
  }
  
  async deleteArenaFloor(floor_id: number) {
    return this.floorsRepository.delete({ id: floor_id });
  }
  
  
  // FloorEnemy
  async getArenaFloorEnemy(floor_enemy_id: number) {
    const enemy = await this.floorsEnemyRepository.findOne({
      relations: ['enemy', 'enemy.race', 'enemy.class', 'enemy.stats'],
      where: { id: floor_enemy_id },
      order: { enemy: { stats: { lvl: 'ASC' } } },
    });
    
    if (!enemy) {
      throw new HttpException('Противник не найден', HttpStatus.BAD_REQUEST);
    }
    
    return enemy;
  }
  
  async getArenaFloorEnemies(floor_id: number) {
    return await this.floorsEnemyRepository.find({
      where: { floor_id: floor_id },
      relations: ['enemy', 'enemy.race', 'enemy.class', 'enemy.stats', 'team'],
      order: { enemy: { stats: { lvl: 'ASC' } } },
    });
  }
  
  async createArenaFloorEnemy(data: CreateArenaFloorEnemyDto) {
    const enemy = this.floorsEnemyRepository.create(data);
    return this.floorsEnemyRepository.save(enemy);
  }
  
  async editArenaFloorEnemy(data: CreateArenaFloorEnemyDto, floor_id: number, floor_enemy_id: number) {
    return this.floorsEnemyRepository.update({ id: floor_enemy_id, floor_id: floor_id }, { ...data, id: floor_enemy_id });
  }
  
  async deleteArenaFloorEnemy(floor_id: number, enemy_id: number) {
    return this.floorsEnemyRepository.delete({ enemy_id: enemy_id, floor_id: floor_id });
  }
}
