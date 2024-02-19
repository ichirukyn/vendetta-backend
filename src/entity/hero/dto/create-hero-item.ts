import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroItemDto {
  @ApiProperty({ example: 1 })
  readonly hero_id: number;
  @ApiProperty({ example: 1 })
  readonly item_id: number;
  @ApiProperty({ example: 1 })
  readonly count: number;
  @ApiProperty({ example: 1 })
  readonly is_stack: boolean;
  @ApiProperty({ example: 1 })
  readonly is_transfer: boolean;
}