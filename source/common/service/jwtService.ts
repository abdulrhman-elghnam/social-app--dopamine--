export class JwtService {
  private static instance: JwtService;

  private constructor() {}

  static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }
}
