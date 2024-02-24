import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 0 })
  readonly leader_id: number;
  
  @ApiProperty({ example: '' })
  readonly name: string;
  
  @ApiProperty({ example: 0 })
  readonly min_stats?: number;
  
  @ApiProperty({ example: true })
  readonly is_private?: boolean;
  
  @ApiProperty({ example: false })
  readonly is_npc?: boolean;
}