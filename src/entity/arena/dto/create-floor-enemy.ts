import { ApiProperty } from '@nestjs/swagger';

export class CreateArenaFloorEnemyDto {
  @ApiProperty({ example: 0 })
  readonly floor_id?: number;
  @ApiProperty({ example: 0 })
  readonly enemy_id?: number;
  @ApiProperty({ example: 0 })
  readonly team_id?: number;
}