import { CreateEffectDto } from '../../effect/dto/create-effect';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpellEffectDto extends CreateEffectDto {
  @ApiProperty({ example: 1 })
  readonly spell_id: number;
}