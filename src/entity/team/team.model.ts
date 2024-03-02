import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'teams' })
export class Team {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 0 })
  @Column()
  leader_id: number;
  
  @ApiProperty({ example: '' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  min_lvl: number;
  
  @ApiProperty({ example: true })
  @Column({ default: true })
  is_private: boolean;
  
  @ApiProperty({ example: false })
  @Column({ default: false })
  is_npc: boolean;
}
