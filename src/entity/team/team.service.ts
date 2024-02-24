import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.model';
import { CreateTeamDto } from './dto/create-team';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamsRepository: Repository<Team>,
  ) {
  }
  
  async getTeam(team_id: number) {
    const team = await this.teamsRepository.findOneBy({ id: team_id });
    
    if (!team) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return team;
  }
  
  async getTeams() {
    return await this.teamsRepository.find();
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
}
