import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.model';
import { EnemyTeam } from '../enemy/enemy-team';

@Module({
  imports: [TypeOrmModule.forFeature([Team, EnemyTeam])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
