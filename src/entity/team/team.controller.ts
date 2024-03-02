import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Team } from './team.model';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { QueryDTO } from '../../common/dtos/query.dto';
import { EnemyTeam } from '../enemy/enemy-team';
import { CreateEnemyTeamDto } from './dto/create-enemy-team';

export abstract class GetTeamDto extends QueryDTO {
  @IsString()
  @IsOptional()
  order_by?: string;
  
  @IsBoolean()
  @IsOptional()
  is_npc?: boolean;
  
  @IsBoolean()
  @IsOptional()
  is_private?: boolean;
  
  @IsNumber()
  @IsOptional()
  min_lvl?: number;
}

@ApiTags('Team')
@Controller('/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {
  }
  
  @ApiOperation({ summary: 'Получение списка предметов' })
  @ApiResponse({ status: 200, type: [Team] })
  @Get('/')
  async getTeams(@Query() query: GetTeamDto) {
    return await this.teamService.getTeams(query);
  }
  
  @ApiOperation({ summary: 'Получение предмета по id' })
  @ApiResponse({ status: 200, type: Team })
  @Get(':team_id')
  async getTeam(@Param('team_id') team_id: number) {
    return await this.teamService.getTeam(team_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета' })
  @ApiResponse({ status: 200, type: [Team] })
  @Post('/')
  async createTeam(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamService.createTeam(createTeamDto);
  }
  
  @ApiOperation({ summary: 'Обновление предмета' })
  @ApiResponse({ status: 200, type: [Team] })
  @Put('/:team_id')
  async editTeam(@Body() createTeamDto: CreateTeamDto, @Param('team_id') team_id: number) {
    return await this.teamService.editTeam(createTeamDto, team_id);
  }
  
  @ApiOperation({ summary: 'Удаление предмета' })
  @ApiResponse({ status: 200, type: [Team] })
  @Delete('/:team_id')
  async deleteTeam(@Param('team_id') team_id: number) {
    return await this.teamService.deleteTeam(team_id);
  }
  
  // Enemy
  @ApiOperation({ summary: 'Получение списка предметов' })
  @ApiResponse({ status: 200, type: [EnemyTeam] })
  @Get('/:team_id/enemy/')
  async getTeamEnemies(@Query() query: GetTeamDto, @Param('team_id') team_id: number) {
    return await this.teamService.getTeamEnemies(team_id, query);
  }
  
  @ApiOperation({ summary: 'Получение предмета по id' })
  @ApiResponse({ status: 200, type: EnemyTeam })
  @Get('/:team_id/enemy/team_id')
  async getTeamEnemy(@Param('team_id') team_id: number, @Param('enemy_id') enemy_id: number) {
    return await this.teamService.getTeamEnemy(team_id, enemy_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета' })
  @ApiResponse({ status: 200, type: [EnemyTeam] })
  @Post('/:team_id/enemy/')
  async createTeamEnemy(@Body() createEnemyTeamDto: CreateEnemyTeamDto) {
    return await this.teamService.createTeamEnemy(createEnemyTeamDto);
  }
  
  @ApiOperation({ summary: 'Обновление предмета' })
  @ApiResponse({ status: 200, type: [EnemyTeam] })
  @Put('/:team_id/enemy/:enemy_id')
  async editTeamEnemy(@Body() createTeamDto: CreateTeamDto, @Param('team_id') team_id: number, @Param('enemy_id') enemy_id: number) {
    return await this.teamService.editTeamEnemy(createTeamDto, team_id, enemy_id);
  }
  
  @ApiOperation({ summary: 'Удаление предмета' })
  @ApiResponse({ status: 200 })
  @Delete('/:team_id/enemy/:id')
  async deleteTeamEnemy(@Param('team_id') team_id: number, @Param('id') id: number) {
    return await this.teamService.deleteTeamEnemy(team_id, id);
  }
}
