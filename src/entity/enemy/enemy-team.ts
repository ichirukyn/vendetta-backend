import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Enemy } from './enemy.model';
import { Team } from '../team/team.model';

@Entity({ name: 'enemy_teams' })
export class EnemyTeam {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  enemy_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  team_id: number;
  
  @OneToOne(() => Enemy)
  @JoinColumn({ name: 'enemy_id' })
  enemy: Enemy;
  
  @OneToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;
  
  @ApiProperty({ example: false })
  @Column({ default: false })
  is_leader: boolean;
  
  @ApiProperty({ example: 'Бурундуки!!' })
  @Column({ default: '' })
  prefix: string;
}