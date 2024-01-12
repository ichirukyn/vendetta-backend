import { ApiProperty } from '@nestjs/swagger';

export class CreateEnemyDto {
  @ApiProperty({ example: '' })
  readonly name: string;
  @ApiProperty({ example: 'Длинное описание...' })
  readonly desc: string;
  @ApiProperty({ example: 'Обычный/Редкий' })
  readonly rank: string;
  @ApiProperty({ example: 0 })
  readonly class_id: number;
  @ApiProperty({ example: 0 })
  readonly race_id: number;
}