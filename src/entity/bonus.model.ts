import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class Bonuses {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'Здоровье/Сила/Огненный урон' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'percent/number' })
  @Column()
  type: string;
  
  @ApiProperty({ example: 'strength/health/damage' })
  @Column()
  attribute: string;
  
  @ApiProperty({ example: '0/100/-0.5' })
  @Column({ type: 'double precision' })
  value: number;
}
