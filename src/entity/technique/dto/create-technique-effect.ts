import { CreateEffectDto } from '../../effect/dto/create-effect';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechniqueEffectDto extends CreateEffectDto {
  @ApiProperty({ example: 1 })
  readonly technique_id: number;
}