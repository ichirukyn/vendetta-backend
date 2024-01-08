import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bonuses } from '../bonus.model';

@Entity({ name: 'races' })
export class Race {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Люди' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Полносе описание...' })
  @Column()
  desc: string;

  @ApiProperty({ example: 'Короткое описание...' })
  @Column()
  desc_short: string;
}
@Entity({ name: 'race_bonuses' })
export class RaceBonuses extends Bonuses {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Люди = 1' })
  @Column()
  @OneToOne(() => Race)
  race_id: number;
}
