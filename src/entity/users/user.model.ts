import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../common/enums/roles.enum';


@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: '123456789' })
  @Column({ nullable: true, type: "bigint" })
  chat_id: string;
  
  @ApiProperty({ example: 'UserLogin' })
  @Column({ nullable: true })
  login: string;
  
  @ApiProperty({ example: 'False' })
  @Column({ default: Roles.Gamer })
  role: string;
  
  @ApiProperty({ example: 'False' })
  @Column({ default: false })
  is_admin: boolean;
  
  @ApiProperty({ example: 'False' })
  @Column({ default: false })
  is_baned: boolean;
  
  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  ref_id: number;
  
  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  password: string;
}
