import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Event, EventTrigger } from './event.model';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event';

@ApiTags('Event')
@Controller('/event')
export class EventController {
  constructor(private readonly userService: EventService) {
  }
  
  @ApiOperation({ summary: 'Получение списка событий' })
  @ApiResponse({ status: 200, type: [Event] })
  @Get('/')
  async getEvents() {
    return await this.userService.getEvents();
  }
  
  @ApiOperation({ summary: 'Получение события по id' })
  @ApiResponse({ status: 200, type: Event })
  @Get('/:event_id')
  async getEvent(@Param('event_id') event_id: number) {
    return await this.userService.getEvent(event_id);
  }
  
  @ApiOperation({ summary: 'Создание события' })
  @ApiResponse({ status: 200, type: Event })
  @Post('/')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.userService.createEvent(createEventDto);
  }
  
  @ApiOperation({ summary: 'Обновление события' })
  @ApiResponse({ status: 200, type: Event })
  @Put('/:event_id')
  async editEvent(@Body() createEventDto: CreateEventDto, @Param('event_id') event_id: number) {
    return await this.userService.editEvent(createEventDto, event_id);
  }
  
  @ApiOperation({ summary: 'Удаление события' })
  @ApiResponse({ status: 200 })
  @Delete('/:event_id')
  async deleteEvent(@Param('event_id') event_id: number) {
    return await this.userService.deleteEvent(event_id);
  }
  
  // Triggers
  @ApiOperation({ summary: 'Получение списка событий' })
  @ApiResponse({ status: 200, type: [EventTrigger] })
  @Get('/:event_id/trigger')
  async getEventTriggers( @Param('event_id') event_id: number) {
    return await this.userService.getEventTriggers(event_id);
  }
  
  @ApiOperation({ summary: 'Получение события по id' })
  @ApiResponse({ status: 200, type: EventTrigger })
  @Get('/:event_id/trigger/:trigger_id')
  async getEventTrigger(@Param('event_id') event_id: number, @Param('trigger_id') trigger_id: number) {
    return await this.userService.getEventTrigger(event_id, trigger_id);
  }
  
  @ApiOperation({ summary: 'Создание события' })
  @ApiResponse({ status: 200, type: EventTrigger })
  @Post('/:event_id/trigger')
  async createEventTrigger(@Body() createEventDto: CreateEventDto, @Param('event_id') event_id: number) {
    return await this.userService.createEventTrigger(createEventDto, event_id);
  }
  
  @ApiOperation({ summary: 'Обновление события' })
  @ApiResponse({ status: 200, type: EventTrigger })
  @Put('/:event_id/trigger/:trigger_id')
  async editEventTrigger(@Body() createEventDto: CreateEventDto, @Param('event_id') event_id: number, @Param('trigger_id') trigger_id: number) {
    return await this.userService.editEventTrigger(createEventDto, event_id, trigger_id);
  }
  
  @ApiOperation({ summary: 'Удаление события' })
  @ApiResponse({ status: 200 })
  @Delete('/:event_id/trigger/:trigger_id')
  async deleteEventTrigger(@Param('event_id') event_id: number, @Param('trigger_id') trigger_id: number) {
    return await this.userService.deleteEventTrigger(event_id, trigger_id);
  }
}
