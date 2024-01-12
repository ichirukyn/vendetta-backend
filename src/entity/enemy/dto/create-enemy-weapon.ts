import { ApiProperty } from '@nestjs/swagger';

export class CreateEnemyWeaponDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
  @ApiProperty({ example: 1 })
  readonly enemy_id: number;
  @ApiProperty({ example: 1 })
  readonly weapon_id: number;
  @ApiProperty({ example: 1 })
  readonly lvl: number;
}