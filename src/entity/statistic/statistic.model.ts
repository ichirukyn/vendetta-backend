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
  @Column({default: 0})
  damage: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  damage_max: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  healing: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  healing_max: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  damage_taken: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  damage_taken_max: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  block_damage: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  counter_strike_damage: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  hits_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  miss_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  crit_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  money_all: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  money_wasted: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  evasion_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  evasion_success_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  block_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  counter_strike_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  pass_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  escape_count: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  win_one_to_one: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  win_team_to_team: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  lose_one_to_one: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  lose_team_to_team: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  kill_enemy: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  kill_hero: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  death: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  count_one_to_one: number;
  
  @ApiProperty({ example: 0 })
  @Column({default: 0})
  count_team_to_team: number;
}