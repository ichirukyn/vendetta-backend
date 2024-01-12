import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Race } from '../race/race.model';
import { Bonuses } from '../bonus.model';

@Entity({ name: 'classes' })
export class Class {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'Воин' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Полносе описание...' })
  @Column()
  desc: string;
  
  @ApiProperty({ example: 'Короткое описание...' })
  @Column()
  desc_short: string;
  //
  // @ApiProperty({ example: 'Люди = 1' })
  // @ManyToOne(() => Race)
  // @JoinColumn({ name: 'race_id' })
  // race: Race;
  
  
  @ApiProperty({ example: 'Люди = 1' })
  @Column()
  @OneToOne(() => Race)
  race_id: number;
  
  @ApiProperty({ example: 'phys/fire/water/etc..' })
  @Column()
  main_attr: string;
  
  @ApiProperty({ example: 'Воин/Маг/Убийца' })
  @Column()
  type: string;
  
  @ApiProperty({ example: false })
  @Column()
  hidden: boolean;
}

@Entity({ name: 'class_bonuses' })
export class ClassBonuses extends Bonuses {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'Воин = 1' })
  @Column()
  @OneToOne(() => Class)
  class_id: number;
}
