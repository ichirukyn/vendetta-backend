import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Hero } from './hero.model';
import { Skill } from '../skill/skill.model';
import { Technique } from '../technique/technique.model';

@Entity({ name: 'hero_techniques' })
export class HeroTechniques {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Hero)
  hero_id: number;

  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Technique)
  technique_id: number;

  @ApiProperty({ example: 10 })
  @Column()
  lvl: number;
}
