import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, EventTrigger } from './event.model';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventTrigger])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {
}
