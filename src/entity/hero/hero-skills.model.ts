import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Hero } from './hero.model';
import { Skill } from '../skill/skill.model';

@Entity({ name: 'hero_skills' })
export class HeroSkills {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Hero)
  hero_id: number;

  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Skill)
  skill_id: number;

  @ApiProperty({ example: 10 })
  @Column()
  lvl: number;
}
