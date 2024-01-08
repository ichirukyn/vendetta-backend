import { Module } from '@nestjs/common';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race, RaceBonuses } from './race.model';

@Module({
  imports: [TypeOrmModule.forFeature([Race, RaceBonuses])],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
