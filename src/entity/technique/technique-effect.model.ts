import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Effect } from '../effect/effect.model';
import { Technique } from './technique.model';

@Entity({ name: 'technique_bonuses' })
export class TechniqueEffect extends Effect {
  @ApiProperty({ example: 'Удар с ноги' })
  @Column()
  technique_id: number;
  
  @ManyToOne(() => Technique, (technique) => technique.effects)
  @JoinColumn({ name: 'technique_id' })
  technique: Technique;
}
