import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: '' })
  readonly name: string;
  @ApiProperty({ example: 'Длинное описание...' })
  readonly desc: string;
  @ApiProperty({ example: 'Короткое описание...' })
  readonly value: number;
  @ApiProperty({ example: 'weapon/potion/etc..' })
  readonly type: string;
  @ApiProperty({ example: 0 })
  readonly modify: number;
  @ApiProperty({ example: 'Воин/Лучник/Маг/Убийца' })
  readonly class_type: string;
  @ApiProperty({ example: 0 })
  readonly class_id: number;
  @ApiProperty({ example: 0 })
  readonly race_id: number;
}