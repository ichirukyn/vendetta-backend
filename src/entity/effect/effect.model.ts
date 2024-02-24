import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Effect {
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
  @Column()
  if_first: string;
  
  @ApiProperty({ example: '>/!=/==' })
  @Column()
  if: string;
  
  @ApiProperty({ example: '0/100/0.5' })
  @Column({ type: 'double precision', transformer: { from: value => parseFloat(value), to: value => value } })
  if_second: number;
  
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
