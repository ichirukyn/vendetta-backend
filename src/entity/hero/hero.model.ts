import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';
import { Race } from '../race/race.model';
import { Class } from '../class/class.model';
import { Lvl } from '../lvl/lvl.model';
import { Stats } from '../stats.model';
import { Technique } from '../technique/technique.model';
import { Item } from '../item/item.model';


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

@Entity({ name: 'heroes' })
export class Hero {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  user_id: number;
  
  @ApiProperty({ example: 'Люди = 1' })
  @Column()
  race_id: number;
  
  @ApiProperty({ example: 'Воин = 1' })
  @Column()
  class_id: number;
  
  @ApiProperty({ example: 1 })
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @ApiProperty({ example: 'HeroName' })
  @Column({ nullable: false })
  name: string;
  
  @ApiProperty({ example: 'Курта' })
  @Column()
  clan: string;
  
  @OneToOne(() => Race)
  @JoinColumn({ name: 'race_id' })
  race: Race;
  
  @OneToOne(() => Class)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id', foreignKeyConstraintName: 'class_id' })
  class: Class;
  
  @ApiProperty({ example: 'D' })
  @Column({ nullable: false, default: 'Редкий' })
  rank: string;
  
  @ApiProperty({ example: 5000 })
  @Column({ nullable: false, default: 5000 })
  money: number;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: false })
  limit_os: number;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: false })
  evolution: number;
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
  @Column()
  hero_id: number;
  
  @OneToOne(() => Technique)
  @JoinColumn({ name: 'technique_id' })
  technique: Technique;
  
  @ApiProperty({ example: 1 })
  @Column()
  technique_id: number;
  
  @ApiProperty({ example: 10 })
  @Column()
  lvl: number;
}


@Entity({ name: 'hero_inventory' })
export class HeroItem {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  hero_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  item_id: number;
  
  @OneToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;
  
  @ApiProperty({ example: 1 })
  @Column()
  count: number;
  
  @ApiProperty({ example: true })
  @Column()
  is_stack: boolean;
  
  @ApiProperty({ example: true })
  @Column()
  is_transfer: boolean;
}

@Entity({ name: 'hero_weapons' })
export class HeroWeapon {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  hero_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  weapon_id: number;
  
  @OneToOne(() => Item)
  @JoinColumn({ name: 'weapon_id' })
  item: Item;
  
  @ApiProperty({ example: 1 })
  @Column()
  lvl: number;
}
