import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistic } from './statistic.model';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic) private statisticsRepository: Repository<Statistic>,
  ) {
  }
  
  async getStatistic(hero_id: number) {
    let statistics = await this.statisticsRepository.findOneBy({ hero_id: hero_id });
    
    if (!statistics) {
      statistics = await this.statisticsRepository.save({ hero_id: hero_id });
    }
    
    return statistics;
  }
  
  async getStatistics() {
    return await this.statisticsRepository.find();
  }
  
  async addStatistics(statistics: Statistic, hero_id: number) {
    return this.statisticsRepository.create({ ...statistics, hero_id: hero_id });
  }
  
  async updateStatistics(statisticsData: Statistic, hero_id: number) {
    const statistics = await this.statisticsRepository.findOneBy({ hero_id: hero_id });
    
    if(!statistics) {
      await this.statisticsRepository.save({ hero_id: hero_id });
    }
    
    await this.statisticsRepository.update({hero_id: hero_id}, statisticsData);
    return statisticsData
  }
}
