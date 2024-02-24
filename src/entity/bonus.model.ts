import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class Bonuses {
  @ApiProperty({ example: 'Здоровье/Сила/Огненный урон' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'percent/number' })
  @Column()
  type: string;
  
  // TODO: Дописать список атрибутов и их значений
  @ApiProperty({ example: 'strength/health/damage' })
  @Column()
  attribute: string;
  
  @ApiProperty({ example: '0/100/-0.5' })
  @Column({ type: 'double precision' })
  value: number;
  
  // @ApiProperty({ example: 'strength/health/damage' })
  // @Column()
  // if_first: string;
  //
  // @ApiProperty({ example: '>/!=/==' })
  // @Column()
  // condition: string;
  //
  // @ApiProperty({ example: '0/100/0.5' })
  // @Column()
  // if_second: number;
}
