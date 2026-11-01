export class MailService {
  private static instance: Promise<MailService> | undefined;

  private constructor() {}

  static getInstance(): Promise<MailService> {
    if (!MailService.instance) {
      MailService.instance = Promise.resolve(new MailService());
    }
    return MailService.instance;
  }
}
