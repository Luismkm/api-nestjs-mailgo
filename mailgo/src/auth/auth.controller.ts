import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './model/LoginRequestBody';
import { Public } from './public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() { name, password }: LoginRequestBody) {
    return this.authService.login(name, password);
  }
}
