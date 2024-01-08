import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Hero } from '../hero/hero.model';

@Entity({ name: 'hero_statistics' })
export class Statistic {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  @OneToOne(() => Hero)
  @JoinColumn({name: 'id'})
  hero_id: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  damage: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  damage_max: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  healing: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  healing_max: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  damage_taken: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  damage_taken_max: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  block_damage: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  counter_strike_damage: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  hits_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  miss_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  crit_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  money_all: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  money_wasted: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  evasion_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  evasion_success_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  block_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  counter_strike_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  pass_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  escape_count: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  win_one_to_one: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  win_team_to_team: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  lose_one_to_one: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  lose_team_to_team: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  kill_enemy: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  kill_hero: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  death: number;
}