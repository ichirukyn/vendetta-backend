import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './statistic.model';
import { Hero } from '../hero/hero.model';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, Hero])],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
