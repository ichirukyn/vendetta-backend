import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stats } from '../stats.model';
import { ApiProperty } from '@nestjs/swagger';
import { Enemy } from './enemy.model';

@Entity({ name: 'enemy_stats' })
export class EnemyStats extends Stats {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  enemy_id: number;

  @OneToOne(() => Enemy)
  @JoinColumn({name: 'id'})
  enemy: Enemy
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
}