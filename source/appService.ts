import { NotFoundException } from './common/exception/mainException.js';
import { utilService, UtilService } from './common/service/utilService.js';

export class AppService {
  constructor(private readonly utilService: UtilService) {}

  public mainService() {
    return this.utilService.responseFormatter({
      handler: () => ({
        messageCode: 101,
      }),
    });
  }

  public notFoundService() {
    throw new NotFoundException('Route Not Found', {
      messageCode: 102,
    });
  }
}

export const appService = new AppService(utilService);
