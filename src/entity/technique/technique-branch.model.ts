import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Technique } from './technique.model';

@Entity({ name: 'technique_branch' })
export class TechniqueBranch {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  technique_id: number;
  
  @ApiProperty({ example: 62 })
  @Column()
  parent_id: number;
  
  @ManyToOne(() => Technique, (technique) => technique.effects)
  @JoinColumn({ name: 'technique_id' })
  technique: Technique;
  
  @ManyToOne(() => Technique, (technique) => technique.effects)
  @JoinColumn({ name: 'parent_id' })
  parent: Technique;
  
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
