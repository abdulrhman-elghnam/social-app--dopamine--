export class UploadService {
  private static instance: Promise<UploadService> | undefined;

  private constructor() {}

  static getInstance(): Promise<UploadService> {
    if (!UploadService.instance) {
      UploadService.instance = Promise.resolve(new UploadService());
    }
    return UploadService.instance;
  }
}
