import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Class } from '../class/class.model';
import { Race } from '../race/race.model';
import { Stats } from '../stats.model';
import { Hero } from '../hero/hero.model';
import { Item } from '../item/item.model';
import { Technique } from '../technique/technique.model';

@Entity({ name: 'enemies' })
export class Enemy {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: '' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Обычный/Редкий' })
  @Column({ nullable: true })
  rank: string;
  
  @Column()
  race_id: number;
  
  @Column()
  class_id: number;
  
  @ApiProperty({ example: 'Люди = 1' })
  @OneToOne(() => Race)
  @JoinColumn({ name: 'race_id' })
  race: Race;
  
  @ApiProperty({ example: 'Воин = 1' })
  @OneToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class;
}


@Entity({ name: 'enemy_stats' })
export class EnemyStats extends Stats {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Hero)
  enemy_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
}


@Entity({ name: 'enemy_weapons' })
export class EnemyWeapon {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Enemy)
  enemy_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Item)
  weapon_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
}

@Entity({ name: 'enemy_technique' })
export class EnemyTechnique {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Enemy)
  enemy_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  @OneToOne(() => Technique)
  technique_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
}