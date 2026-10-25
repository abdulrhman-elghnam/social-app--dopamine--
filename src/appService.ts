import { NotFoundException } from './common/exception/main.exception';
import { ResponseFormatter } from './common/handler/sendSuccessHandler';

export const mainService = ResponseFormatter({
  handler: () => ({
    messageCode: 101,
  }),
});

export const notFoundService = () => {
  throw new NotFoundException({ messageCode: 102 });
};
