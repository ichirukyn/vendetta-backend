import { Module } from '@nestjs/common';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race, RaceBonuses } from './race.model';
import { Class } from '../class/class.model';

@Module({
  imports: [TypeOrmModule.forFeature([Race, RaceBonuses, Class])],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
