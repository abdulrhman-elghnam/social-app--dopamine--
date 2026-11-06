import { GenderEnum } from "../value/databaseEnum.js";
import { ProviderEnum, SystemRoleEnum } from "../value/securityEnum.js";

export interface IUser {
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    password: string;
    gender: GenderEnum;
    role: SystemRoleEnum;
    provider: ProviderEnum;
    phone: string;
    DOB: string;
    confirmEmail: string;
    image: string;
    coverImage: [string];
    changeCredentialsTime: string
}