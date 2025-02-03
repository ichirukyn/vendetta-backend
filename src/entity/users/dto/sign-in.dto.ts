import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: '12345678' })
  readonly chat_id: string;
  @ApiProperty({ example: 'UserLogin' })
  readonly login: string;
  @ApiProperty({ example: 'AnyPassword' })
  readonly password?: string;
}