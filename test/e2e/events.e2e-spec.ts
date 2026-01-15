import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { App } from 'supertest/types';

import { PostgresContainer } from 'test/helpers/setup/postgres-container';
import { TestApp } from 'test/helpers/setup/test-app';

import { Event } from 'src/events/entities/event.entity';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { UpdateEventDto } from 'src/events/dto/update-event.dto';

describe('Events e2e', () => {
  const nonExistentEventId = randomUUID();
  const defaultCreateEventDto: CreateEventDto = {
    title: 'Test',
    start: new Date(),
    end: new Date(Date.now() + 3600000),
  };

  const db = new PostgresContainer();
  const appFactory = new TestApp();

  let app: INestApplication<App>;

  const createMockEvent = async (
    createEventDto: CreateEventDto = defaultCreateEventDto,
  ): Promise<Event> => {
    const res = await request(app.getHttpServer())
      .post('/events')
      .send(createEventDto)
      .expect(201);

    return res.body as Event;
  };

  beforeAll(async () => {
    await db.start();
    app = await appFactory.start();
  }, 10000);

  afterEach(async () => {
    await db.cleanDatabase(app.get(DataSource));
  });

  afterAll(async () => {
    await app.close();
    await db.stop();
  });

  describe('POST /events', () => {
    it('creates a new event', async () => {
      const event = await createMockEvent();

      expect(event).toHaveProperty('id');
      expect(event.title).toBe(defaultCreateEventDto.title);
      expect(event.start).toBe(defaultCreateEventDto.start.toISOString());
      expect(event.end).toBe(defaultCreateEventDto.end.toISOString());
    });

    it('returns 400 if data is invalid', async () => {
      const invalidCreateEventDto = {
        start: 'invalid-date',
        end: 'invalid-date',
      };

      await request(app.getHttpServer())
        .post('/events')
        .send(invalidCreateEventDto)
        .expect(400);
    });
  });

  describe('GET /events', () => {
    it('returns an array of events', async () => {
      const event1 = await createMockEvent();
      const event2 = await createMockEvent({
        ...defaultCreateEventDto,
        title: 'Test 1',
      });

      const res = await request(app.getHttpServer()).get('/events').expect(200);

      const body = res.body as Event[];

      expect(body.length).toBe(2);
      expect(body.some(({ id }) => id === event1.id)).toBe(true);
      expect(body.some(({ id }) => id === event2.id)).toBe(true);
    });

    it('returns an filtered by search string array of events', async () => {
      const event1 = await createMockEvent({
        ...defaultCreateEventDto,
        title: 'Test 1',
      });
      await createMockEvent({
        ...defaultCreateEventDto,
        title: 'Event 2',
      });

      const search = 'Test';

      const query = new URLSearchParams({ search }).toString();

      const res = await request(app.getHttpServer())
        .get(`/events?${query}`)
        .expect(200);

      const body = res.body as Event[];

      expect(body.length).toBe(1);
      expect(body[0].id).toEqual(event1.id);
    });
  });

  describe('GET /events/:id', () => {
    it('returns an event by id', async () => {
      const event = await createMockEvent();

      const res: { body: Event } = await request(app.getHttpServer())
        .get(`/events/${event.id}`)
        .expect(200);

      expect(res.body.id).toBe(event.id);
      expect(res.body.title).toBe(event.title);
    });

    it('returns 404 if event does not exist', async () => {
      await request(app.getHttpServer())
        .get(`/events/${nonExistentEventId}`)
        .expect(404);
    });
  });

  describe('PATCH /events/:id', () => {
    it('updates an event by id', async () => {
      const updateEventDto: UpdateEventDto = { title: 'Test Updated' };

      const event = await createMockEvent();
      const res = await request(app.getHttpServer())
        .patch(`/events/${event.id}`)
        .send(updateEventDto)
        .expect(200);

      const body = res.body as Event;

      expect(body.id).toBe(event.id);
      expect(body.title).toBe(updateEventDto.title);
    });

    it('returns 404 if event does not exist', async () => {
      const updateEvent: UpdateEventDto = { title: 'Test Updated' };

      await request(app.getHttpServer())
        .patch(`/events/${nonExistentEventId}`)
        .send(updateEvent)
        .expect(404);
    });
  });

  describe('DELETE /events/:id', () => {
    it('deletes an event by id', async () => {
      const event = await createMockEvent();

      await request(app.getHttpServer())
        .delete(`/events/${event.id}`)
        .expect(200);

      await request(app.getHttpServer()).get(`/events/${event.id}`).expect(404);
    });

    it('returns 404 if event does not exist', async () => {
      await request(app.getHttpServer())
        .delete(`/events/${nonExistentEventId}`)
        .expect(404);
    });
  });
});
