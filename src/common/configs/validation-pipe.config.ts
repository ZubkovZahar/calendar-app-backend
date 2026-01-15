import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
};

export const globalValidationPipe = new ValidationPipe(validationPipeOptions);
