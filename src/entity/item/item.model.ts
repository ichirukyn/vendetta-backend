import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Class } from '../class/class.model';
import { Race } from '../race/race.model';

@Entity({ name: 'items' })
export class Item {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: '' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Длинное описание...' })
  @Column({ nullable: true })
  desc: string;
  
  @ApiProperty({ example: 'Короткое описание...' })
  @Column({ type: 'double precision', nullable: true })
  value: number;
  
  @ApiProperty({ example: 'weapon/potion/etc..' })
  @Column()
  type: string;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: true })
  modify: number;
  
  @ApiProperty({ example: 'Воин/Лучник/Маг/Убийца' })
  @Column({ nullable: true })
  class_type: string;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: true })
  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class_id: number;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: true })
  @ManyToOne(() => Race)
  @JoinColumn({ name: 'race_id' })
  race_id: number;
}
