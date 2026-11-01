import { NotFoundException } from './common/exception/mainException.js';
import { UtilService } from './common/service/utilService.js';

export class AppService {
  private static instance: Promise<AppService> | undefined;

  private constructor(private readonly utilService: UtilService) {}

  public static getInstance(): Promise<AppService> {
    if (!AppService.instance) {
      AppService.instance = (async () => {
        const utilService = await UtilService.getInstance();

        return new AppService(utilService);
      })();
    }
    return AppService.instance;
  }

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
