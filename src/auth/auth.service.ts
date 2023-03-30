import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(payload: any) {
    // Here, you would typically query your database to find the user
    // based on the user ID from the payload.
    // For this example, we're just returning a user object.
    return { id: payload.id, email: payload.email };
  }

  async logIn(user: any) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}