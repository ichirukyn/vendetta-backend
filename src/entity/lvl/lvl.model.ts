import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'levels' })
export class Lvl {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  lvl: number;
  
  @ApiProperty({ example: '10' })
  @Column()
  exp_to_lvl: number;
  
  @ApiProperty({ example: '50' })
  @Column()
  exp_total: number;
}