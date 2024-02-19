import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Statistic } from './statistic.model';
import { StatisticService } from './statistic.service';

@ApiTags('Statistic')
@Controller('/statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {
  }
  
  @ApiOperation({ summary: 'Получение статистики по id игрока' })
  @ApiResponse({ status: 200, type: Statistic })
  @Get('/:hero_id')
  async getStatistic(@Param('hero_id') hero_id: number) {
    return await this.statisticService.getStatistic(hero_id);
  }
  
  @ApiOperation({ summary: 'Получение статистик игроков' })
  @ApiResponse({ status: 200, type: [Statistic] })
  @Get('/')
  async getStatistics() {
    return await this.statisticService.getStatistics();
  }
  
  @ApiOperation({ summary: 'Создание статистики игрока' })
  @ApiResponse({ status: 201, type: Statistic })
  @Post('/:hero_id')
  async addStatistics(@Body() statisticsData: Statistic, @Param('hero_id') hero_id: number) {
    return await this.statisticService.addStatistics(statisticsData, hero_id);
  }
  
  @ApiOperation({ summary: 'Обновление статистики игрока' })
  @ApiResponse({ status: 200, type: Statistic })
  @Put('/:hero_id')
  async updateStatistics(@Body() statisticsData: Statistic, @Param('hero_id') hero_id: number) {
    return await this.statisticService.updateStatistics(statisticsData, hero_id);
  }
}
