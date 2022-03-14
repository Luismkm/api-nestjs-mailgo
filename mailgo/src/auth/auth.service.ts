import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from 'src/errors/UnauthorizedError';
import { UserPayload } from './model/UserPayload';
import { UserToken } from './model/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(name: string, password: string): Promise<UserToken> {
    const user: User = await this.validateUser(name, password);

    const payload: UserPayload = {
      username: user.name,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(name: string, password: string) {
    const user = await this.userService.findByName(name);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new UnauthorizedError('User or password provided is incorrect');
  }
}
