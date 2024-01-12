import { ApiProperty } from '@nestjs/swagger';

export class CreateEnemyTechniqueDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
  @ApiProperty({ example: 1 })
  readonly enemy_id: number;
  @ApiProperty({ example: 1 })
  readonly technique_id: number;
  @ApiProperty({ example: 1 })
  readonly lvl: number;
}