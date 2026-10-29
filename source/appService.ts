import { NotFoundException } from './common/exception/main.exception';
import { ResponseFormatter } from './common/util/sendSuccessHandler';


export class AppService {
  public mainService = ResponseFormatter({
    handler: () => {
      return {
        messageCode: 101,
      };
    },
  });

  public notFoundService = () => {
    throw new NotFoundException("Route Not Found",{ messageCode: 102 });
  };
}
