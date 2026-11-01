export class TokenService {
  private static instance: Promise<TokenService> | undefined;

  private constructor() {}

  static getInstance(): Promise<TokenService> {
    if (!TokenService.instance) {
      TokenService.instance = Promise.resolve(new TokenService());
    }
    return TokenService.instance;
  }
}
