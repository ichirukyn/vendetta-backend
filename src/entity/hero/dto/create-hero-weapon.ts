import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroWeaponDto {
  @ApiProperty({ example: 1 })
  readonly hero_id: number;
  @ApiProperty({ example: 1 })
  readonly weapon_id: number;
  @ApiProperty({ example: 1 })
  readonly lvl: number;
}