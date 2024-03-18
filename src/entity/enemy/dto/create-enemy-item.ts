import { ApiProperty } from '@nestjs/swagger';

export class CreateEnemyItemDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
  @ApiProperty({ example: 1 })
  readonly enemy_id: number;
  @ApiProperty({ example: 1 })
  readonly item_id: number;
  @ApiProperty({ example: 0 })
  readonly chance?: number;
  @ApiProperty({ example: 1 })
  readonly count_min?: number;
  @ApiProperty({ example: 1 })
  readonly count_max?: number;
  @ApiProperty({ example: 1 })
  readonly count?: number;
  @ApiProperty({ example: 1 })
  readonly exp?: number;
  @ApiProperty({ example: 1 })
  readonly gold?: number;
}