import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsEndAfterStart(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEndAfterStart',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_: unknown, args: ValidationArguments): boolean {
          const object = args.object as { start?: Date; end?: Date };

          if (!object.start || !object.end) return true;

          return object.end > object.start;
        },
        defaultMessage() {
          return 'End must be later than start';
        },
      },
    });
  };
}
