import { Module } from '@nestjs/common';
import { ArenaFloorController } from './arena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArenaFloor } from './arena.model';
import { ArenaFloorService } from './arena.service';
import { ArenaFloorEnemy } from './floor.model';

@Module({
  imports: [TypeOrmModule.forFeature([ArenaFloor, ArenaFloorEnemy])],
  controllers: [ArenaFloorController],
  providers: [ArenaFloorService],
})
export class ArenaFloorModule {}
