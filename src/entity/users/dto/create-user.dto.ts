import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '12345678' })
  readonly chat_id: string;
  @ApiProperty({ example: 'UserLogin' })
  readonly login: string;
  @ApiProperty({ example: 1 })
  readonly ref_id: number;
}
