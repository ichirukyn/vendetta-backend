import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventTrigger } from './event.model';
import { CreateEventDto } from './dto/create-event';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    @InjectRepository(EventTrigger) private eventTriggersRepository: Repository<EventTrigger>,
  ) {
  }
  
  async getEvent(event_id: number) {
    const event = await this.eventsRepository.findOneBy({ id: event_id });
    
    if (!event) {
      throw new HttpException('Событие не найдено', HttpStatus.BAD_REQUEST);
    }
    
    return event;
  }
  
  async getEvents() {
    return await this.eventsRepository.find();
  }
  
  async createEvent(data: CreateEventDto) {
    const event = this.eventsRepository.create(data);
    return this.eventsRepository.save(event);
  }
  
  async editEvent(data: CreateEventDto, event_id: number) {
    return this.eventsRepository.update({ id: event_id }, { ...data, id: event_id });
  }
  
  async deleteEvent(event_id: number) {
    return this.eventsRepository.delete({ id: event_id });
  }
  
  // Triggers
  async getEventTriggers(event_id: number) {
    return await this.eventTriggersRepository.findBy({ event_id: event_id});
  }
  
  async getEventTrigger(event_id: number, trigger_id: number) {
    const event = await this.eventTriggersRepository.findOneBy({ id: trigger_id, event_id: event_id });
    
    if (!event) throw new HttpException('Триггер не найден', HttpStatus.BAD_REQUEST);
    
    return event;
  }
  
  async createEventTrigger(data: CreateEventDto, event_id: number) {
    const event = this.eventTriggersRepository.create({ ...data, event_id: event_id });
    return this.eventTriggersRepository.save(event);
  }
  
  async editEventTrigger(data: CreateEventDto, event_id: number, trigger_id: number) {
    return this.eventTriggersRepository.update({ id: trigger_id, event_id: event_id }, { ...data, id: event_id });
  }
  
  async deleteEventTrigger(event_id: number, trigger_id: number) {
    return this.eventTriggersRepository.delete({ id: trigger_id, event_id: event_id });
  }
}
