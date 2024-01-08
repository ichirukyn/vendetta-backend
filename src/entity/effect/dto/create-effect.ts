import { ApiProperty } from '@nestjs/swagger';

export class CreateEffectDto {
  @ApiProperty({ example: 'Здоровье/Сила/Огненный урон' })
  name: string;
  @ApiProperty({ example: 'percent/add' })
  type: string;
  @ApiProperty({ example: 'strength/health/damage' })
  attribute: string;
  @ApiProperty({ example: '0/100/-0.5' })
  value: number;
  @ApiProperty({ example: 'strength/health/damage' })
  if_first: string;
  @ApiProperty({ example: '>/!=/==' })
  if: string;
  @ApiProperty({ example: '0/100/0.5' })
  if_second: number;
  @ApiProperty({ example: 'my/enemy' })
  direction: string;
  @ApiProperty({ example: 0 })
  duration: number;
  @ApiProperty({ example: false })
  is_single: boolean;
}