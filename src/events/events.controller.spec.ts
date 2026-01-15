import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

import { MockClass } from 'test/helpers/mocks';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { controllerTestingModule } from 'test/helpers/setup/controller-testing-module';

describe('EventsController', () => {
  let controller: EventsController;
  let mockEventsService: MockClass<EventsService>;

  beforeEach(async () => {
    const setup = await controllerTestingModule<
      EventsController,
      EventsService
    >(EventsController, EventsService);

    controller = setup.controller;
    mockEventsService = setup.service;
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const mockEvent: Partial<Event> = { id: '1', title: 'Test Event' };

      mockEventsService.findAll!.mockResolvedValue([mockEvent]);

      await expect(controller.findAll()).resolves.toEqual([mockEvent]);
      expect(mockEventsService.findAll).toHaveBeenCalled();
    });

    it('should return an filtered by search string array of events', async () => {
      const mockEvent: Partial<Event> = { id: '1', title: 'Test Event' };
      const search = 'Test';

      mockEventsService.findAll!.mockResolvedValue([mockEvent]);

      await expect(controller.findAll(search)).resolves.toEqual([mockEvent]);
      expect(mockEventsService.findAll).toHaveBeenCalledWith(search);
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const testId = '1';
      const mockEvent: Partial<Event> = { id: testId, title: 'Test Event' };

      mockEventsService.findOne!.mockResolvedValue(mockEvent);

      await expect(controller.findOne(testId)).resolves.toEqual(mockEvent);
      expect(mockEventsService.findOne).toHaveBeenCalledWith(testId);
    });
  });

  describe('create', () => {
    it('should create an event', async () => {
      const createEventDto: CreateEventDto = {
        title: 'New Event',
        start: new Date(),
        end: new Date(Date.now() + 3600000),
      };
      const createdEvent: Partial<Event> = {
        ...createEventDto,
        id: '1',
      };

      mockEventsService.create!.mockResolvedValue(createdEvent);

      await expect(controller.create(createEventDto)).resolves.toEqual(
        createdEvent,
      );
      expect(mockEventsService.create).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const testId = '1';
      const updateEventDto: UpdateEventDto = {
        title: 'Updated Event',
      };
      const updatedEvent: Partial<Event> = {
        id: testId,
        title: updateEventDto.title,
      };

      mockEventsService.update!.mockResolvedValue(updatedEvent);

      await expect(controller.update(testId, updateEventDto)).resolves.toEqual(
        updatedEvent,
      );
      expect(mockEventsService.update).toHaveBeenCalledWith(
        testId,
        updateEventDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      const testId = '1';
      const mockEvent: Partial<Event> = { id: testId, title: 'Test Event' };

      mockEventsService.remove!.mockResolvedValue(mockEvent);

      await expect(controller.remove(testId)).resolves.toEqual(mockEvent);
      expect(mockEventsService.remove).toHaveBeenCalledWith(testId);
    });
  });
});
