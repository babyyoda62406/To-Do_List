import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('token') token: string) {
    return this.authService.validateToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtectedResource(@Request() req) {
    return { message: 'This is a protected route', user: req.user };
  }
}
