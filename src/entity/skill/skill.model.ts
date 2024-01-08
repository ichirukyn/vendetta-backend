import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'skills' })
export class Skill {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Длинное описание...' })
  @Column()
  desc: string;

  @ApiProperty({ example: 'Короткое описание...' })
  @Column()
  desc_short: string;

  @ApiProperty({ example: 10 })
  @Column()
  duration: number;

  @ApiProperty({ example: 10 })
  @Column({ nullable: true })
  duration_time: string;
}
