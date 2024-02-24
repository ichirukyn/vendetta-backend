import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ArenaFloorEnemy } from './floor.model';

@Entity({ name: 'arena_floors' })
export class ArenaFloor {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: '' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Длинное описание...' })
  @Column({ nullable: true })
  desc: string;
  
  @ApiProperty({ example: 0 })
  @Column({ type: 'double precision', default: 0 })
  chance_bonus: number;
  
  @ApiProperty({ example: 0 })
  @Column({ nullable: true })
  max_rate_drop: number;
  
  @OneToMany(() => ArenaFloorEnemy, (enemy) => enemy.floor)
  @JoinColumn({ name: 'id' })
  enemies: ArenaFloorEnemy[];
}