import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Spell } from './spell.model';

@Entity({ name: 'spell_branch' })
export class SpellBranch {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  spell_id: number;
  
  @ApiProperty({ example: 62 })
  @Column()
  parent_id: number;
  
  @ManyToOne(() => Spell, (spell) => spell.effects)
  @JoinColumn({ name: 'spell_id' })
  spell: Spell;
  
  @ManyToOne(() => Spell, (spell) => spell.effects)
  @JoinColumn({ name: 'parent_id' })
  parent: Spell;
  
  @ApiProperty({ example: false })
  @Column({ nullable: true, default: false })
  is_hidden: boolean;
  
  @ApiProperty({ example: 'Хп' })
  @Column({ nullable: true })
  condition_attribute: string;
  
  @ApiProperty({ example: '>=' })
  @Column({ nullable: true })
  condition: string;
  
  @ApiProperty({ example: 50 })
  @Column({ type: 'double precision', nullable: true })
  condition_value: number;
}
