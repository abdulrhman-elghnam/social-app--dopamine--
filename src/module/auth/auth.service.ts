import { z } from 'zod';
import { IHandlerResult, utilService, } from '../../dependencies/service/util.service.js';
import { AuthDTO } from './dto/auth.dto.js';
import { userRepository } from '../../database/repository/user.repository.js';
import { cacheService, RedisKeys } from '../../dependencies/service/cache.service.js';
import { securityService } from '../../dependencies/service/security.service.js';
import { tokenService } from '../../dependencies/service/token.service.js';
import { googleService } from '../../dependencies/service/google.service.js';
import { mailEvent } from '../../dependencies/event/mail.event.js';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '../../dependencies/exception/main.exception.js';
import { GenderEnum, ProviderEnum, SystemRoleEnum } from '../../dependencies/value/databaseEnum.js';
import { SystemRoleEnum as TokenRoleEnum } from '../../dependencies/value/securityEnum.js';



export class AuthService {
  constructor() {}
  signup = async (
    payload: z.infer<ReturnType<AuthDTO['signupDTO']>['body']>
  ): Promise<IHandlerResult> => {
    const email = payload.email.toLowerCase();
    const existingUser = await userRepository.findOne({
      filter: { $or: [{ email }, { username: payload.username }] },
    });
    if (existingUser) {
      throw new ConflictException('Email or username already exists', { messageCode: 402 });
    }

    const { firstName, lastName } = utilService.splitFullName(payload.fullName);
    await userRepository.create({
      data: {
        firstName,
        lastName,
        username: payload.username,
        email,
        password: await securityService.hash(payload.password),
        ...(payload.phoneNumber ? { phone: payload.phoneNumber } : {}),
        ...(payload.DOB ? { DOB: new Date(payload.DOB) } : {}),
        gender:
          payload.gender === 'MALE' ? GenderEnum.MALE : GenderEnum.FEMALE,
        role: SystemRoleEnum.USER,
        provider: ProviderEnum.LOCAL,
        isEmailVerified: false,
        isActive: true,
      },
    });

    const otp = utilService.createOtp();
    await cacheService.setCache({
      key: RedisKeys.otpKey(email),
      value: otp,
      options: { EX: 10 * 60 },
    });
    await mailEvent.sendVerificationEmail({ email, otp });

    return { status: 201, messageCode: 104 };
  };

  login = async (
    payload: z.infer<ReturnType<AuthDTO['loginDTO']>['body']>
  ): Promise<IHandlerResult> => {
    const user = await userRepository.findOne({
      filter: { email: payload.email.toLowerCase(), isActive: true },
      options: { select: { password: 1 } },
    });
    if (!user?.password || !(await securityService.compare(payload.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials', { messageCode: 301 });
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email is not verified', { messageCode: 406 });
    }

    const credentials = await tokenService.createLoginCredentials(
      {
        _id: user._id ?? '',
        role: user.role === 'admin' ? TokenRoleEnum.ADMIN : TokenRoleEnum.USER,
      },
      'dopamine'
    );
    return { messageCode: 309, data: credentials };
  };

  googleCredential = async (
    payload: z.infer<ReturnType<AuthDTO['googleSignUpDTO']>['body']>
  ): Promise<IHandlerResult> => {
    const account = await googleService.verifyGoogleAccount(payload.idToken);
    let user = await userRepository.findOne({
      filter: { email: account.email },
    });

    if (!user) {
      const nameParts = (account.name ?? account.email.split('@')[0] ?? 'Google User')
        .trim()
        .split(/\s+/);
      user = await userRepository.create({
        data: {
          firstName: nameParts[0] ?? 'Google',
          lastName: nameParts.slice(1).join(' ') || nameParts[0] || 'User',
          username:
            account.email.split('@')[0]?.slice(0, 30) || account.googleId.slice(0, 30),
          email: account.email,
          gender: GenderEnum.MALE,
          role: SystemRoleEnum.USER,
          provider: ProviderEnum.GOOGLE,
          isEmailVerified: true,
          isActive: true,
          ...(account.picture ? { image: account.picture } : {}),
        },
      });
    }

    const credentials = await tokenService.createLoginCredentials(
      { _id: user._id ?? '', role: TokenRoleEnum.USER },
      'dopamine'
    );
    return { status: 201, messageCode: 104, data: credentials };
  };

  requestForgetPassword = async (
    payload: { email: string }
  ): Promise<IHandlerResult> => {
    const email = payload.email.toLowerCase();
    const user = await userRepository.findOne({ filter: { email } });

    if (!user) {
      throw new NotFoundException('User not found', { messageCode: 401 });
    }

    const otp = utilService.createOtp();
    await cacheService.setCache({
      key: RedisKeys.otpKey(user.email),
      value: otp,
      options: { EX: 10 * 60 },
    });
    await mailEvent.sendForgotPasswordEmail({ email: user.email, otp });

    return { status: 201, messageCode: 104 };
  };

  changePassword = async (
    payload: { email: string; password: string; confirmPassword: string }
  ): Promise<IHandlerResult> => {
    const email = payload.email.toLowerCase();
    const user = await userRepository.findOne({ filter: { email } });

    if (!user) {
      throw new NotFoundException('User not found', { messageCode: 401 });
    }

    await userRepository.findOneAndUpdate({
      filter: { email },
      data: {
        $set: {
          password: payload.password,
          changeCredentialsTime: new Date(),
        },
      },
    });

    await tokenService.logout(user._id ?? '');
    await cacheService.deleteCache(RedisKeys.otpKey(email));
    return { messageCode: 105 };
  };

  verifyForgotPassword = async (
    payload: z.infer<ReturnType<AuthDTO['otpDTO']>['body']>
  ): Promise<IHandlerResult> => {
    const email = payload.email.toLowerCase();
    const cachedOtp = await cacheService.getCache<number>(RedisKeys.otpKey(email));

    if (cachedOtp !== Number(payload.otp)) {
      throw new BadRequestException('Invalid OTP', { messageCode: 233 });
    }

    await userRepository.findOne({ filter: { email } });
    return { messageCode: 107 };
  };

  verifyOtp = async (
    payload: z.infer<ReturnType<AuthDTO['otpDTO']>['body']>
  ): Promise<IHandlerResult> => {
    const email = payload.email.toLowerCase();
    const cachedOtp = await cacheService.getCache<number>(RedisKeys.otpKey(email));

    if (cachedOtp !== Number(payload.otp)) {
      throw new BadRequestException('Invalid OTP', { messageCode: 233 });
    }

    const user = await userRepository.findOneAndUpdate({
      filter: { email },
      data: { $set: { isEmailVerified: true } },
    });
    if (!user) {
      throw new BadRequestException('User not found', { messageCode: 401 });
    }

    await cacheService.deleteCache(RedisKeys.otpKey(email));
    return { messageCode: 107 };
  };
}

export const authService = new AuthService();
