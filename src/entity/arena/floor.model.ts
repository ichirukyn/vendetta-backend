import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Enemy } from '../enemy/enemy.model';
import { ArenaFloor } from './arena.model';

@Entity({ name: 'floor_enemies' })
export class ArenaFloorEnemy {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  enemy_id: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  floor_id: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  team_id: number;
  
  @OneToOne(() => Enemy)
  @JoinColumn({ name: 'enemy_id' })
  enemy: Enemy;
  
  @ManyToOne(() => ArenaFloor, (arena) => arena.enemies)
  @JoinColumn({ name: 'floor_id' })
  floor: ArenaFloor;
  
  // @OneToOne(() => EnemyTeam)
  // @JoinColumn({ name: 'id' })
  // teams: EnemyTeam;
}
