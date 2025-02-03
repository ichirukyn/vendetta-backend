import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Race, RaceBonuses } from './race.model';
import { RaceService } from './race.service';
import { Class } from '../class/class.model';
import { IsBoolean, IsOptional } from 'class-validator';

export abstract class QueryRaceDto {
  @IsBoolean()
  @IsOptional()
  hidden?: boolean;
}

@ApiTags('Race')
@Controller('/race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @ApiOperation({ summary: 'Получение расы по id' })
  @ApiResponse({ status: 200, type: Race })
  @Get('/:race_id')
  async getRace(@Param('race_id') race_id: number, @Query() data: QueryRaceDto) {
    return await this.raceService.getRace(race_id, data);
  }

  @ApiOperation({ summary: 'Получение списка рас' })
  @ApiResponse({ status: 200, type: [Race] })
  @Get('/')
  async getRaces(@Query() data: QueryRaceDto) {
    return await this.raceService.getRaces(data);
  }

  @ApiOperation({ summary: 'Получение списка рас' })
  @ApiResponse({ status: 200, type: [RaceBonuses] })
  @Get('/:race_id/effect')
  async getRaceBonuses(@Param('race_id') race_id: number) {
    return await this.raceService.getRaceBonuses(race_id);
  }
  
  // Class
  @ApiOperation({ summary: 'Получение списка классов по race_id' })
  @ApiResponse({ status: 200, type: [Class] })
  @Get('/:race_id/class')
  async getClassByRace(@Param('race_id') race_id: number) {
    return await this.raceService.getClassByRace(race_id);
  }
}
