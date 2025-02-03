import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bonuses } from '../bonus.model';
import { Tag } from '../tag/tag.model';

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
  
  @ApiProperty({ example: 'Скрыта ли раса?' })
  @Column({ default: false })
  hidden: boolean;
  
  @ApiProperty({ example: 'Ловкий' })
  @Column()
  @OneToOne(() => Tag)
  tag_id: number;
  
  @ApiProperty({ example: '[]' })
  @OneToMany(() => RaceBonuses, (effect) => effect.race)
  bonuses: number;
  
  @OneToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}

@Entity({ name: 'race_bonuses' })
export class RaceBonuses extends Bonuses {
  @ApiProperty({ example: 'Люди = 1' })
  @Column()
  @OneToOne(() => Race)
  race_id: number;
  
  @ManyToOne(() => Race, (race) => race.bonuses)
  @JoinColumn({ name: 'race_id' })
  race: Race;
}
