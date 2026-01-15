import { Type } from '@nestjs/common';

export type MockClass<T> = Partial<Record<keyof T, jest.Mock>>;

export const createMockFromService = <TService>(
  service: Type<TService>,
): MockClass<TService> => {
  const prototype = service.prototype as TService;
  const propertyNames = Object.getOwnPropertyNames(prototype);
  const mock: MockClass<TService> = {};

  propertyNames.forEach((name) => {
    if (name !== 'constructor' && typeof prototype[name] === 'function') {
      mock[name] = jest.fn();
    }
  });

  return mock;
};
