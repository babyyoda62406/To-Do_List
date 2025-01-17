import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map(error => {
          const constraints = error.constraints;
          const property = error.property;
          const paths = error.property.split('.');
          return {
            property,
            paths,
            constraints,
          };
        });
        return new BadRequestException({ message: 'Error de Validación', errors: errorMessages });
      },
    });
  }

  transformException(errors: ValidationError[]) {
    const errorMessages = errors.map(error => {
      const constraints = error.constraints;
      const property = error.property;
      const paths = error.property.split('.');
      return {
        property,
        paths,
        constraints,
      };
    });
    return new BadRequestException({ message: 'Validation failed', errors: errorMessages });
  }
}