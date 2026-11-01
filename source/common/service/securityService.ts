export class SecurityService {
  private static instance: Promise<SecurityService> | undefined;

  private constructor() {}

  static getInstance(): Promise<SecurityService> {
    if (!SecurityService.instance) {
      SecurityService.instance = Promise.resolve(new SecurityService());
    }
    return SecurityService.instance;
  }
}
