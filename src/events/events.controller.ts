import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(): Event[] {
    return [
      {
        name: 'JUG Vale 2024 - Adyen',
        capacityLimit: 60,
        price: 100,
      },
      {
        name: 'ADA :: Javascript cod3rs',
        capacityLimit: 100,
        price: 0,
      },
      {
        name: 'GoLang users',
        capacityLimit: 30,
        price: 20.99,
      },
    ];
  }
}

interface Event {
  name: string;
  capacityLimit: number;
  price: number;
}
