import { model, Schema } from 'mongoose';
import { GenderEnum, ProviderEnum, SystemRoleEnum } from '../../dep/value/database.enum.js';
import type { IUser } from '../../dep/interface/database.interface.js';
import { securityService } from '../../dep/service/security.service.js';

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    gender: { type: String, enum: GenderEnum, required: true },
    role: { type: String, enum: SystemRoleEnum, default: SystemRoleEnum.USER },
    provider: { type: String, enum: ProviderEnum, required: true },
    phone: String,
    DOB: Date,
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    image: String,
    coverImage: String,
    bio: String,
    changeCredentialsTime: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword() {
  if (this.isModified('password') && this['password']) {
    this['password'] = await securityService.hash(this['password']);
    this['changeCredentialsTime'] = new Date();
  }
});

userSchema.pre('findOneAndUpdate', async function hashPasswordOnUpdate() {
  const update = this.getUpdate() as Record<string, unknown> | undefined;
  const password =
    typeof update?.['password'] === 'string'
      ? update['password']
      : (update?.['$set'] as Record<string, unknown> | undefined)?.['password'];

  if (typeof password === 'string') {
    const hashedPassword = await securityService.hash(password);
    if (update?.['$set'] !== undefined) {
      const set = update['$set'] as Record<string, unknown>;
      set['password'] = hashedPassword;
      set['changeCredentialsTime'] = new Date();
    } else if (update) {
      update['password'] = hashedPassword;
      update['changeCredentialsTime'] = new Date();
    }
  }
});

export const UserModel = model<IUser>('User', userSchema);
