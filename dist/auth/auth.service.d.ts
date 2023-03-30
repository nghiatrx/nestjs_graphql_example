import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateUser(payload: any): Promise<{
        id: any;
        email: any;
    }>;
    logIn(user: any): Promise<string>;
}
