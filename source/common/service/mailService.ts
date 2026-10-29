export class cacheService {
  private static instance: cacheService;

  private constructor() {}

  static getInstance(): cacheService {
    if (!cacheService.instance) {
      cacheService.instance = new cacheService();
    }
    return cacheService.instance;
  }
}
