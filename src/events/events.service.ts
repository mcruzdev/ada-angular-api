import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event)
    private readonly eventRepository: typeof Event,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }
}
