import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Class } from '../class/class.model';
import { Race } from '../race/race.model';
import { Item } from '../item/item.model';
import { Technique } from '../technique/technique.model';
import { EnemyStats } from './enemy-stats.model';

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
  
  @ApiProperty({ example: 'Люди = 1' })
  @Column()
  race_id: number;
  
  @ApiProperty({ example: 'Воин = 1' })
  @Column()
  class_id: number;
  
  @OneToOne(() => Race)
  @JoinColumn({ name: 'race_id' })
  race: Race;
  
  @OneToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class;
  
  @OneToOne(() => EnemyStats)
  @JoinColumn({ name: 'id' })
  stats: EnemyStats;
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
  technique_id: number;
  
  
  @OneToOne(() => Technique)
  @JoinColumn({ name: 'technique_id' })
  technique: Technique;
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
}

@Entity({ name: 'enemy_inventory' })
export class EnemyItem {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  enemy_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  item_id: number;
  
  @OneToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision', default: 0 })
  chance: number;
  
  @ApiProperty({ example: 1 })
  @Column({ default: 0 })
  count_min: number;
  
  @ApiProperty({ example: 1 })
  @Column({ default: 0 })
  count_max: number;
  
  @ApiProperty({ example: 1 })
  @Column({ default: 0 })
  count: number;
  
  @ApiProperty({ example: 1 })
  @Column({ default: 0 })
  exp: number;
  
  @ApiProperty({ example: 1 })
  @Column({ default: 0 })
  gold: number;
}