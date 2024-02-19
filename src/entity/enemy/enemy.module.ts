import { Module } from '@nestjs/common';
import { EnemyController } from './enemy.controller';
import { EnemyService } from './enemy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enemy, EnemyItem, EnemyTechnique, EnemyWeapon } from './enemy.model';
import { EnemyStats } from './enemy-stats.model';
import { HeroModule } from '../hero/hero.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enemy, EnemyStats, EnemyWeapon, EnemyTechnique, EnemyItem]), HeroModule],
  controllers: [EnemyController],
  providers: [EnemyService],
})
export class EnemyModule {
}
