import { NotFoundException } from './common/exception/mainException.js';
import { UtilService } from './common/service/utilService.js';

export class AppService {
  private static instancePromise: Promise<AppService> | undefined;

  private constructor(private readonly utilService: UtilService) {}

  public static getInstance(): Promise<AppService> {
    if (!AppService.instancePromise) {
      AppService.instancePromise = AppService.createInstance();
    }

    return AppService.instancePromise;
  }

  private static async createInstance(): Promise<AppService> {
    const utilService = await UtilService.getInstance();

    return new AppService(utilService);
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
