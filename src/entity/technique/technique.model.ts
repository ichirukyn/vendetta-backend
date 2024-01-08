import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Effect } from '../effect/effect.model';

@Entity({ name: 'techniques' })
export class Technique {
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
  @Column({ type: 'double precision' })
  damage: number;
  
  @ApiProperty({ example: 'phys_damage' })
  @Column({ nullable: true })
  type_damage: string;
  
  @ApiProperty({ example: 'melee | distant' })
  @Column({ nullable: true })
  distance: string;
  
  @ApiProperty({ example: false })
  @Column({ nullable: true })
  is_stack: boolean;
  
  @ApiProperty({ example: 1 })
  @Column()
  class_id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  race_id: number;
  
  @ApiProperty({ example: 'attack' })
  @Column()
  type: string;
  
  @ApiProperty({ example: 0 })
  @Column()
  cooldown: number;
}

@Entity({ name: 'technique_bonuses' })
export class TechniqueEffect extends Effect {
  @ApiProperty({ example: 'Удар с ноги' })
  @Column()
  technique_id: number;
}