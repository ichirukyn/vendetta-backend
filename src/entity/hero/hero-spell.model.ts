import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Spell } from '../spell/spell.model';

@Entity({ name: 'hero_spell' })
export class HeroSpell {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  hero_id: number;
  
  @OneToOne(() => Spell)
  @JoinColumn({ name: 'spell_id' })
  spell: Spell;
  
  @ApiProperty({ example: 1 })
  @Column()
  spell_id: number;
  
  @ApiProperty({ example: 10 })
  @Column({ default: 0, nullable: true })
  lvl: number;
}