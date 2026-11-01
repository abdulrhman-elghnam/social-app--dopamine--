import { z } from "zod";
import { AuthenticationDTO } from "./authenticationDto.js";

export class AuthenticationService {
    private static instance: Promise<AuthenticationService> | undefined;


    private constructor() { }

    static getInstance(): Promise<AuthenticationService> {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = Promise.resolve(new AuthenticationService());
        }
        return AuthenticationService.instance;
    }

    signup = ({ }: z.infer<ReturnType<AuthenticationDTO['signupDto']>['body']>) => {

    }

}