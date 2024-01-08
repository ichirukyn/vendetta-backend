import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroDto {
  @ApiProperty({ example: 1 })
  readonly user_id: number;
  @ApiProperty({ example: 'UserName' })
  readonly name: string;
  @ApiProperty({ example: 1 })
  readonly race_id: number;
  @ApiProperty({ example: 1 })
  readonly class_id: number;
}
