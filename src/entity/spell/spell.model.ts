import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SpellEffect } from './spell-effect.model';

@Entity({ name: 'spells' })
export class Spell {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'Удар с ноги' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Описание' })
  @Column({ nullable: true })
  desc: string;
  
  @ApiProperty({ example: 'Описание (короткое)' })
  @Column({ nullable: true })
  desc_short: string;
  
  @ApiProperty({ example: 0.5 })
  @Column({ type: 'double precision', default: 0 })
  damage: number;
  
  @ApiProperty({ example: 'phys_damage' })
  @Column({ nullable: true })
  type_damage: string;
  
  @ApiProperty({ example: 'Magic/Stenght/Dextery' })
  @Column({ nullable: true })
  type_attack: string;
  
  @ApiProperty({ example: 'melee | distant' })
  @Column({ nullable: true })
  distance: string;
  
  @ApiProperty({ example: false })
  @Column({ nullable: true })
  is_stack: boolean;
  
  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  class_id: number;
  
  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  race_id: number;
  
  @ApiProperty({ example: 'attack' })
  @Column({ default: 'attack' })
  type: string;
  
  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  cooldown: number;
  
  @OneToMany(() => SpellEffect, (effect) => effect.spell)
  effects: SpellEffect[];
  
  @ApiProperty({ example: false })
  @Column({ default: false })
  hidden: boolean;
  
  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  author_id: number;
  
  @ApiProperty({ example: 1 })
  @Column({ default: 1 })
  rank: number;
}

