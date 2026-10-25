import { AppError } from './appException';
import type { IAppErrorOptions } from './interface/exception.type';

export class BadRequestException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Bad request', ...options }, 400);
  }
}

export class UnauthorizedException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Unauthorized', ...options }, 401);
  }
}

export class ForbiddenException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Forbidden', ...options }, 403);
  }
}

export class NotFoundException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Resource not found', ...options }, 404);
  }
}

export class ConflictException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Conflict', ...options }, 409);
  }
}

export class UnprocessableEntityException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Unprocessable entity', ...options }, 422);
  }
}

export class TooManyRequestsException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Too many requests', ...options }, 429);
  }
}

export class InternalServerErrorException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Internal server error', ...options }, 500);
  }
}

export class ServiceUnavailableException extends AppError {
  constructor(options: IAppErrorOptions = {}) {
    super({ message: 'Service unavailable', ...options }, 503);
  }
}
