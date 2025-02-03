import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tags' })
export class Tag {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'Ловкий' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Длинное описание...' })
  @Column({ nullable: true })
  desc: string;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: true, default: 0 })
  priority: number;
  
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision' })
  strength: number;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision' })
  health: number;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision' })
  speed: number;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision' })
  accuracy: number;
  
  @ApiProperty({ example: 1 })
  @Column({ type: 'double precision' })
  dexterity: number;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision' })
  soul: number;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision' })
  intelligence: number;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision' })
  submission: number;
  
}
