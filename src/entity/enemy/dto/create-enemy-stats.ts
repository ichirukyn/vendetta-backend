import { ApiProperty } from '@nestjs/swagger';

export class CreateEnemyStatsDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
  @ApiProperty({ example: 1 })
  readonly enemy_id: number;
  @ApiProperty({ example: 1 })
  readonly lvl: number;
  @ApiProperty({ example: 100 })
  readonly strength: number;
  @ApiProperty({ example: 100 })
  readonly health: number;
  @ApiProperty({ example: 100 })
  readonly speed: number;
  @ApiProperty({ example: 100 })
  readonly accuracy: number;
  @ApiProperty({ example: 100 })
  readonly dexterity: number;
  @ApiProperty({ example: 100 })
  readonly soul: number;
  @ApiProperty({ example: 100 })
  readonly intelligence: number;
  @ApiProperty({ example: 100 })
  readonly submission: number;
  @ApiProperty({ example: 0.05 })
  readonly crit_rate: number;
  @ApiProperty({ example: 0.5 })
  readonly crit_damage: number;
  @ApiProperty({ example: 0.1 })
  readonly resist: number;
  @ApiProperty({ example: 7 })
  readonly total_stats: number;
}