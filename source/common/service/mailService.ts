export class MailService {
  private static instance: MailService;

  private constructor() {}

  static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }
}
