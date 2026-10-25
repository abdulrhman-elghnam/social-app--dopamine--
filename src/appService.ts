import { NotFoundException } from './common/exception/main.exception';
import { ResponseFormatter } from './common/handler/sendSuccessHandler';

export class AppService {

  public mainService = ResponseFormatter({
    handler: () => {
      return {
        messageCode: 101,
      }
    },
  });

  public notFoundService = () => {
    throw new NotFoundException({ messageCode: 102 });
  };

}