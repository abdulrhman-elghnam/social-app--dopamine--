import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env['NODE_ENV'] || 'dev'}`,
  ),
});

export class ConfigService {
  private static instance: ConfigService;

  private constructor() {}

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }

    return ConfigService.instance;
  }

  get(key: string, defaultValue?: string): string | undefined {
    return process.env[key] ?? defaultValue;
  }

  getOrThrow(key: string): string {
    const value = process.env[key];

    if (value === undefined || value.trim() === '') {
      throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
  }
}