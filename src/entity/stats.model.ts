import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class Stats {
  @ApiProperty({ example: 100 })
  @Column()
  strength: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  health: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  speed: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  accuracy: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  dexterity: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  soul: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  intelligence: number;
  
  @ApiProperty({ example: 100 })
  @Column()
  submission: number;
  
  @ApiProperty({ example: 0.05 })
  @Column({type: "double precision"})
  crit_rate: number;
  
  @ApiProperty({ example: 0.5 })
  @Column({type: "double precision"})
  crit_damage: number;
  
  @ApiProperty({ example: 0.1 })
  @Column({type: "double precision"})
  resist: number;
  
  @ApiProperty({ example: 7 })
  @Column()
  total_stats: number;
}