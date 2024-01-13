import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroTechniqueDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
  @ApiProperty({ example: 1 })
  readonly hero_id: number;
  @ApiProperty({ example: 1 })
  readonly technique_id: number;
  @ApiProperty({ example: 1 })
  readonly lvl: number;
}