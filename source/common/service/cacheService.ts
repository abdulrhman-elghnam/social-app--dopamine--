export class CacheService {
  private static instance: Promise<CacheService> | undefined;

  private constructor() {}

  static getInstance(): Promise<CacheService> {
    if (!CacheService.instance) {
      CacheService.instance = Promise.resolve(new CacheService());
    }
    return CacheService.instance;
  }
}
