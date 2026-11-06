import mongoose from 'mongoose';
import { configService } from './config.service.js';

class DatabaseService {
  constructor() {}

  connect = async () => {
    try {
      await mongoose.connect(String(configService.get('DATABASE_URI')));
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  };
}
export const databaseService = new DatabaseService();
