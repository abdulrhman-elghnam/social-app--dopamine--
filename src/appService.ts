import { NotFoundException } from './common/exception/main.exception';

export const mainService = () => {};

export const notFoundService = () => {
  throw new NotFoundException({ message: 'route not found' });
};
