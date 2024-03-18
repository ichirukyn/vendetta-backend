import { ApiProperty } from '@nestjs/swagger';

export class CreateSpellDto {
  @ApiProperty({ example: 'Жертвенный удар' })
  readonly name: string;
  @ApiProperty({ example: 'Полное описание' })
  readonly desc: string;
  @ApiProperty({ example: 'Короткое описание' })
  readonly desc_short: string;
  @ApiProperty({ example: 0.5 })
  readonly damage: number;
  @ApiProperty({ example: 'phys_damage' })
  readonly type_damage: string;
  @ApiProperty({ example: 'melee' })
  readonly distance: string;
  @ApiProperty({ example: false })
  readonly is_stack: boolean;
  @ApiProperty({ example: 1 })
  readonly class_id: number;
  @ApiProperty({ example: 1 })
  readonly race_id: number;
  @ApiProperty({ example: 'attack' })
  readonly type: string;
  @ApiProperty({ example: 0 })
  readonly cooldown: number;
}
