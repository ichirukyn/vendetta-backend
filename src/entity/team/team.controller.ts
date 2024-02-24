import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Team } from './team.model';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team';

@ApiTags('Team')
@Controller('/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {
  }
  
  @ApiOperation({ summary: 'Получение списка предметов' })
  @ApiResponse({ status: 200, type: [Team] })
  @Get('/')
  async getTeams() {
    return await this.teamService.getTeams();
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
}
