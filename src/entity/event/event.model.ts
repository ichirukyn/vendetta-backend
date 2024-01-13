import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../item/item.model';

@Entity({ name: 'events' })
export class Event {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: '' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Длинное описание...' })
  @Column()
  desc: string;
  
  @ApiProperty({ example: 'Диалог или пролог..' })
  @Column({ nullable: true })
  text: string;
  
  @ApiProperty({ example: 'Клавиатура..' })
  @Column({ nullable: true })
  keyboard: string;
  
  @ApiProperty({ example: 'State..' })
  @Column({ nullable: true })
  state: string;
  
  @ApiProperty({ example: 'Квест/Босс/Сражение' })
  @Column({ default: 'quest' })
  type: string;
}


@Entity({ name: 'event_triggers' })
export class EventTrigger {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1 })
  @Column()
  event_id: number;
  
  @ApiProperty({ example: '' })
  @Column()
  name: string;
  
  @ApiProperty({ example: 'Длинное описание...' })
  @Column()
  desc: string;
  
  @ApiProperty({ example: 'Условие' })
  @Column()
  condition_attr: string;
  
  @ApiProperty({ example: 'Условие' })
  @Column()
  condition: string;
  
  @ApiProperty({ example: 'Условие' })
  @Column({ type: 'double precision' })
  condition_value: number;
  
  @ApiProperty({ example: 'Условие' })
  @OneToOne(() => Item)
  condition_item: number;
  
  @ApiProperty({ example: 0.1 })
  @Column({ type: 'double precision' })
  chance: number;
  
  @ApiProperty({ example: 'Старт/Начало/Условие' })
  @Column({ nullable: true, default: 'Условие' })
  trigger_type: string;
  
  @ApiProperty({ example: 'Диалог или пролог..' })
  @Column({ nullable: true })
  text: string;
  
  @ApiProperty({ example: 'Крутой меч' })
  @Column({ nullable: true })
  reward: string;
  
  @ApiProperty({ example: 'Обязательный?' })
  @Column({ nullable: true, default: false })
  mandatory: boolean;
  
  @ApiProperty({ example: 'Скрытый?' })
  @Column({ nullable: true, default: false })
  hidden: boolean;
}
