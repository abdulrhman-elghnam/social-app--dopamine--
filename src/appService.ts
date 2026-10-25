import { NotFoundException } from './common/exception/main.exception';
import { ResponseFormatter } from './common/handler/sendSuccessHandler';

export const mainService = ResponseFormatter({
  handler: () => ({
    
    message: 'API is running',
  }),
});

export const notFoundService = () => {
  throw new NotFoundException({ message: 'route not found' });
};
