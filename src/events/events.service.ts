import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventRepository.create(createEventDto);

    return await this.eventRepository.save(newEvent);
  }

  async findAll(search?: string): Promise<Event[]> {
    if (search) {
      return await this.eventRepository.find({
        where: {
          title: ILike(`%${search}%`),
        },
        order: { start: 'ASC' },
      });
    }

    return await this.eventRepository.find({
      order: { start: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);

    const startDate = updateEventDto.start ?? event.start;
    const endDate = updateEventDto.end ?? event.end;

    if (endDate <= startDate) {
      throw new BadRequestException('End must be later than start');
    }

    const updatedEvent = Object.assign(event, updateEventDto);

    return await this.eventRepository.save(updatedEvent);
  }

  async remove(id: string): Promise<Event> {
    const event = await this.findOne(id);

    return await this.eventRepository.remove(event);
  }
}
