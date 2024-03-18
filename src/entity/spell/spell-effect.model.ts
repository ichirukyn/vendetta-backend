import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Spell } from './spell.model';


// TODO: Сделать его основной
class Effect {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'Здоровье/Сила/Огненный урон' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'percent/add' })
  @Column()
  type: string;
  
  @ApiProperty({ example: 'strength/health/damage' })
  @Column()
  attribute: string;
  
  @ApiProperty({ example: '0/100/-0.5' })
  @Column({ type: 'double precision' })
  value: number;
  
  @ApiProperty({ example: 'strength/health/damage' })
  @Column({ nullable: true })
  dependency: string;
  
  @ApiProperty({ example: '0/100/0.5' })
  @Column({ nullable: true, type: 'double precision', transformer: { from: value => parseFloat(value), to: value => value } })
  dependency_value: number;
  
  @ApiProperty({ example: '+10, +150' })
  @Column({ nullable: true, type: 'double precision', transformer: { from: value => parseFloat(value), to: value => value } })
  dependency_add: number;
  
  @ApiProperty({ example: 'strength/health/damage' })
  @Column({ nullable: true })
  condition_attribute: string;
  
  @ApiProperty({ example: '>/!=/==' })
  @Column({ nullable: true })
  condition: string;
  
  @ApiProperty({ example: '0/100/0.5' })
  @Column({ nullable: true, type: 'double precision', transformer: { from: value => parseFloat(value), to: value => value } })
  condition_value: number;
  
  @ApiProperty({ example: 'my/enemy' })
  @Column()
  direction: string;
  
  @ApiProperty({ example: 0 })
  @Column()
  duration: number;
  
  @ApiProperty({ example: false })
  @Column()
  is_single: boolean;
  
  @ApiProperty({ example: false })
  @Column({ default: false })
  every_turn: boolean;
}

@Entity({ name: 'spell_effects' })
export class SpellEffect extends Effect {
  @ApiProperty({ example: 'Удар с ноги' })
  @Column()
  spell_id: number;
  
  @ManyToOne(() => Spell, (spell) => spell.effects)
  @JoinColumn({ name: 'spell_id' })
  spell: Spell;
}