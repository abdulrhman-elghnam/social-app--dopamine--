import { DatabaseRepository } from './base.repository.js';
import type { IUser } from '../../dependencies/interface/databaseInterface.js';
import { UserModel } from '../model/user.model.js';
import { HydratedDocument } from 'mongoose';

export class UserRepository extends DatabaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }
}
export type HUserDocument = HydratedDocument<IUser>;
export const userRepository = new UserRepository();
