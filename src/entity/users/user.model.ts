import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: '123456789' })
  @Column()
  chat_id: string;
  
  @ApiProperty({ example: 'UserLogin' })
  @Column({ nullable: false })
  login: string;
  
  @ApiProperty({ example: 'False' })
  @Column({ default: false })
  is_admin: boolean;
  
  @ApiProperty({ example: 'False' })
  @Column({ default: false })
  is_baned: boolean;
  
  @ApiProperty({ example: 1 })
  @Column({ nullable: false })
  ref_id: number;
}
