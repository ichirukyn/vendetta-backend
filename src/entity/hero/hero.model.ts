import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';
import { Race } from '../race/race.model';
import { Class } from '../class/class.model';
import { Lvl } from '../lvl/lvl.model';
import { Stats } from '../stats.model';
import { Technique } from '../technique/technique.model';

@Entity({ name: 'heroes' })
export class Hero {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => User)
  user_id: number;
  
  @ApiProperty({ example: 'HeroName' })
  @Column({ nullable: false })
  name: string;
  
  @ApiProperty({ example: 'Курта' })
  @Column({ default: false })
  clan: string;
  
  @ApiProperty({ example: 'Люди = 1' })
  @Column({ default: false })
  @OneToOne(() => Race)
  race_id: number;
  
  @ApiProperty({ example: 'Воин = 1' })
  @Column({ default: false })
  @OneToOne(() => Class)
  class_id: number;
  
  @ApiProperty({ example: 'D' })
  @Column({ nullable: false })
  rank: string;
  
  @ApiProperty({ example: 5000 })
  @Column({ nullable: false })
  money: number;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: false })
  limit_os: number;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: false })
  evolution: number;
}

@Entity({ name: 'hero_stats' })
export class HeroStats extends Stats {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Hero)
  hero_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
  
  @ApiProperty({ example: 10 })
  @Column()
  free_stats: number;
}


@Entity({ name: 'hero_levels' })
export class HeroLvl {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Hero)
  hero_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  exp: number;
  
  @OneToOne(() => Lvl)
  @JoinColumn({ name: 'lvl' })
  level: Lvl;
}

@Entity({ name: 'hero_technique' })
export class HeroTechnique {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @OneToOne(() => Hero)
  @JoinColumn({name: 'hero_id', referencedColumnName: 'id', foreignKeyConstraintName: 'hero_id'})
  hero_id: number;
  
  @ApiProperty({ example: 1 })
  @OneToOne(() => Technique)
  @JoinColumn({name: 'technique_id', referencedColumnName: 'id', foreignKeyConstraintName: 'technique_id'})
  technique_id: number;
  
  @ApiProperty({ example: 10 })
  @Column()
  lvl: number;
}
