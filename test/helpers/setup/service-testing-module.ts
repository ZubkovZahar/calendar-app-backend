import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Type } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ObjectLiteral } from 'typeorm';

import { createMockRepository } from '../typeorm';

export const serviceTestingModule = async <
  TService,
  TEntity extends ObjectLiteral,
>(
  serviceClass: Type<TService>,
  entityClass: EntityClassOrSchema,
) => {
  const mockRepository = createMockRepository<TEntity>();

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      serviceClass,
      {
        provide: getRepositoryToken(entityClass),
        useValue: mockRepository,
      },
    ],
  }).compile();

  return {
    service: module.get<TService>(serviceClass),
    repository: mockRepository,
  };
};
