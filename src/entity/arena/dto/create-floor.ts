import { ApiProperty } from '@nestjs/swagger';

export class CreateArenaFloorDto {
  @ApiProperty({ example: '' })
  readonly name: string;
  @ApiProperty({ example: 'Длинное описание...' })
  readonly desc: string;
  @ApiProperty({ example: 0 })
  readonly chance_bonus: number;
  @ApiProperty({ example: 0 })
  readonly max_rate_drop: number;
}