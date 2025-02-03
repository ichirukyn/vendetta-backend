import { QueryDTO } from '../../../common/dtos/query.dto';
import { Optional } from '@nestjs/common';

export class LootDto extends QueryDTO {
  @Optional()
  hero_id?: number;
  
  @Optional()
  enemy_lvl?: number;
}