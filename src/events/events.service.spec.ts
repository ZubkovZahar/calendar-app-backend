import { BadRequestException, NotFoundException } from '@nestjs/common';

import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { MockRepository } from 'test/helpers/typeorm';
import { serviceTestingModule } from 'test/helpers/setup/service-testing-module';
import { ILike } from 'typeorm';

describe('EventsService', () => {
  let service: EventsService;
  let mockEventsRepository: MockRepository<Event>;

  beforeEach(async () => {
    const setup = await serviceTestingModule<EventsService, Event>(
      EventsService,
      Event,
    );

    service = setup.service;
    mockEventsRepository = setup.repository;
  });

  describe('findAll', () => {
    it('should return array of events', async () => {
      const mockEvent: Partial<Event> = { id: '1', title: 'Test Event' };

      mockEventsRepository.find!.mockResolvedValue([mockEvent]);

      const result = await service.findAll();

      expect(result).toEqual([mockEvent]);
      expect(mockEventsRepository.find).toHaveBeenCalled();
    });

    it('should return an filtered by search string array of events', async () => {
      const mockEvent: Partial<Event> = { id: '1', title: 'Test Event' };
      const search = 'Test';

      mockEventsRepository.find!.mockResolvedValue([mockEvent]);

      const result = await service.findAll(search);

      expect(result).toEqual([mockEvent]);
      expect(mockEventsRepository.find).toHaveBeenCalledWith({
        where: {
          title: ILike(`%${search}%`),
        },
        order: { start: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const testId = '1';
      const mockEvent: Partial<Event> = { id: testId, title: 'Test Event' };

      mockEventsRepository.findOneBy!.mockResolvedValue(mockEvent);

      const result = await service.findOne(testId);

      expect(result).toEqual(mockEvent);
      expect(mockEventsRepository.findOneBy).toHaveBeenCalledWith({
        id: testId,
      });
    });

    it('should throw NotFoundException when event not found', async () => {
      const testId = '1';

      mockEventsRepository.findOneBy!.mockResolvedValue(null);

      await expect(service.findOne(testId)).rejects.toThrow(NotFoundException);
      expect(mockEventsRepository.findOneBy).toHaveBeenCalledWith({
        id: testId,
      });
    });
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const createEventDto: CreateEventDto = {
        title: 'New Event',
        start: new Date(),
        end: new Date(Date.now() + 3600000),
      };
      const mockEvent: Partial<Event> = {
        ...createEventDto,
        id: '1',
      };

      mockEventsRepository.create!.mockReturnValue(mockEvent);
      mockEventsRepository.save!.mockResolvedValue(mockEvent);

      const result = await service.create(createEventDto);

      expect(result).toEqual(mockEvent);
      expect(mockEventsRepository.create).toHaveBeenCalledWith(createEventDto);
      expect(mockEventsRepository.save).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('update', () => {
    it('should update an existing event', async () => {
      const testId = '1';
      const updateEventDto: UpdateEventDto = { title: 'Updated Event' };
      const mockEvent: Partial<Event> = { id: testId, title: 'Old Event' };
      const updatedEvent: Partial<Event> = {
        id: testId,
        title: updateEventDto.title,
      };

      const findOneSpy = jest.spyOn(service, 'findOne');

      findOneSpy.mockResolvedValue(mockEvent as Event);
      mockEventsRepository.save!.mockResolvedValue(updatedEvent);

      const result = await service.update(testId, updateEventDto);

      expect(result).toEqual(updatedEvent);
      expect(findOneSpy).toHaveBeenCalledWith(testId);
      expect(mockEventsRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(updateEventDto),
      );
    });

    it('should throw BadRequestException when end date is before start date', async () => {
      const id = '1';

      const mockEvent: Partial<Event> = {
        id,
        start: new Date(),
        end: new Date(Date.now() + 3600000),
      };
      const updateEventDto: UpdateEventDto = {
        end: new Date(Date.now() - 3600000),
      };

      const findOneSpy = jest.spyOn(service, 'findOne');

      findOneSpy.mockResolvedValue(mockEvent as Event);

      await expect(service.update(id, updateEventDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(mockEventsRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when start date is after end date', async () => {
      const id = '1';

      const mockEvent: Partial<Event> = {
        id,
        start: new Date(),
        end: new Date(Date.now() + 3600000),
      };
      const updateEventDto: UpdateEventDto = {
        start: new Date(Date.now() + 2 * 3600000),
      };

      const findOneSpy = jest.spyOn(service, 'findOne');

      findOneSpy.mockResolvedValue(mockEvent as Event);

      await expect(service.update(id, updateEventDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(mockEventsRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when start and end dates are equal', async () => {
      const id = '1';
      const sameDate = new Date();

      const mockEvent: Partial<Event> = {
        id,
        start: sameDate,
        end: sameDate,
      };
      const updateEventDto: UpdateEventDto = {};

      const findOneSpy = jest.spyOn(service, 'findOne');

      findOneSpy.mockResolvedValue(mockEvent as Event);

      await expect(service.update(id, updateEventDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(mockEventsRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove an existing event', async () => {
      const testId = '1';
      const mockEvent: Partial<Event> = {
        id: testId,
        title: 'Event to be removed',
      };

      const findOneSpy = jest.spyOn(service, 'findOne');

      findOneSpy.mockResolvedValue(mockEvent as Event);
      mockEventsRepository.remove!.mockResolvedValue(mockEvent);

      const result = await service.remove(testId);

      expect(result).toEqual(mockEvent);
      expect(findOneSpy).toHaveBeenCalledWith(testId);
      expect(mockEventsRepository.remove).toHaveBeenCalledWith(mockEvent);
    });
  });
});
