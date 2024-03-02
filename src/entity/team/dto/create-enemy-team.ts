import { ApiProperty } from '@nestjs/swagger';

export class CreateEnemyTeamDto {
  @ApiProperty({ example: 0 })
  readonly enemy_id: number;
  
  @ApiProperty({ example: 0 })
  readonly team_id: number;
  
  @ApiProperty({ example: false })
  readonly is_leader?: boolean;
  
  @ApiProperty({ example: 'Бурундуки!!' })
  readonly prefix?: string;
  
}