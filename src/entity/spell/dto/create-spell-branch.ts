import { ApiProperty } from '@nestjs/swagger';

export class CreateSpellBranchDto {
  @ApiProperty({ example: 1 })
  readonly parent_id: number;
  @ApiProperty({ example: 1 })
  readonly spell_id: number;
  @ApiProperty({ example: false })
  readonly is_hidden: boolean;
  @ApiProperty({ example: 'Хп' })
  readonly condition_attribute?: string;
  @ApiProperty({ example: '>=' })
  readonly condition?: string;
  @ApiProperty({ example: 50 })
  readonly condition_value?: number;
}