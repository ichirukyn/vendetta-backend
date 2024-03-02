import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.model';
import { CreateTeamDto } from './dto/create-team';
import { GetTeamDto } from './team.controller';
import { Order } from '../../common/enums';
import { EnemyTeam } from '../enemy/enemy-team';
import { CreateEnemyTeamDto } from './dto/create-enemy-team';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamsRepository: Repository<Team>,
    @InjectRepository(EnemyTeam) private enemyTeamsRepository: Repository<EnemyTeam>,
  ) {
  }
  
  async getTeam(team_id: number) {
    const team = await this.teamsRepository.findOneBy({ id: team_id });
    
    if (!team) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return team;
  }
  
  async getTeams({ order_by = 'id', order_type = Order.ASC, is_private = false, min_lvl = 0, is_npc = false }: GetTeamDto) {
    return await this.teamsRepository.find({
      where: { is_npc: is_npc, is_private: is_private, min_lvl: min_lvl },
      order: { [order_by]: order_type },
    });
  }
  
  async createTeam(data: CreateTeamDto) {
    const team = this.teamsRepository.create(data);
    return this.teamsRepository.save(team);
  }
  
  async editTeam(data: CreateTeamDto, team_id: number) {
    return this.teamsRepository.update({ id: team_id }, { ...data, id: team_id });
  }
  
  async deleteTeam(team_id: number) {
    return this.teamsRepository.delete({ id: team_id });
  }
  
  
  // Enemy
  async getTeamEnemies(team_id: number, { order_by = 'id', order_type = Order.ASC }: GetTeamDto) {
    return await this.enemyTeamsRepository.find({
      relations: ['enemy'],
      where: { team_id: team_id },
      order: { [order_by]: order_type },
    });
  }
  
  async getTeamEnemy(team_id: number, enemy_id: number) {
    const team = await this.enemyTeamsRepository.findOne({
      relations: ['enemy'],
      where: { team_id: team_id, enemy_id: enemy_id },
    });
    
    if (!team) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return team;
  }
  
  async createTeamEnemy(data: CreateEnemyTeamDto) {
    const team = this.enemyTeamsRepository.create(data);
    return this.enemyTeamsRepository.save(team);
  }
  
  async editTeamEnemy(data: CreateTeamDto, team_id: number, enemy_id: number) {
    return this.enemyTeamsRepository.update({ team_id: team_id, enemy_id: enemy_id }, { ...data, id: team_id });
  }
  
  async deleteTeamEnemy(team_id: number, id: number) {
    return this.enemyTeamsRepository.delete({ team_id: team_id, id: id });
  }
}
