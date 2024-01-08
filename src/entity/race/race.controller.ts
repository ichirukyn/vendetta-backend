import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Race, RaceBonuses } from './race.model';
import { RaceService } from './race.service';

@ApiTags('Race')
@Controller('/race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @ApiOperation({ summary: 'Получение расы по id' })
  @ApiResponse({ status: 200, type: Race })
  @Get('/:race_id')
  async getRace(@Param('race_id') race_id: number) {
    return await this.raceService.getRace(race_id);
  }

  @ApiOperation({ summary: 'Получение списка рас' })
  @ApiResponse({ status: 200, type: [Race] })
  @Get('/')
  async getRaces() {
    return await this.raceService.getRaces();
  }

  @ApiOperation({ summary: 'Получение списка рас' })
  @ApiResponse({ status: 200, type: [RaceBonuses] })
  @Get('/:race_id/bonus')
  async getRaceBonuses(@Param('race_id') race_id: number) {
    return await this.raceService.getRaceBonuses(race_id);
  }
}
