import { Module } from '@nestjs/common';
import { EnemyController } from './enemy.controller';
import { EnemyService } from './enemy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enemy, EnemyStats, EnemyTechnique, EnemyWeapon } from './enemy.model';

@Module({
  imports: [TypeOrmModule.forFeature([Enemy, EnemyStats, EnemyWeapon, EnemyTechnique])],
  controllers: [EnemyController],
  providers: [EnemyService],
})
export class EnemyModule {}
