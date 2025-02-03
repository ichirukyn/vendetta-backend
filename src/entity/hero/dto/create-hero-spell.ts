import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroSpellDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
  @ApiProperty({ example: 1 })
  readonly hero_id: number;
  @ApiProperty({ example: 1 })
  readonly spell_id: number;
  @ApiProperty({ example: 1 })
  readonly lvl?: number;
}