import { Test, TestingModule } from '@nestjs/testing';
import { Type } from '@nestjs/common';
import { createMockFromService } from '../mocks';

export const controllerTestingModule = async <TController, TService>(
  controllerClass: Type<TController>,
  serviceClass: Type<TService>,
) => {
  const mockService = createMockFromService(serviceClass);

  const module: TestingModule = await Test.createTestingModule({
    controllers: [controllerClass],
    providers: [
      {
        provide: serviceClass,
        useValue: mockService,
      },
    ],
  }).compile();

  return {
    controller: module.get<TController>(controllerClass),
    service: mockService,
  };
};
