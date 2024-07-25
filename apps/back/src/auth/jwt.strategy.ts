import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { envVars } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envVars.JWT_SECRET, 
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateToken(payload);
    if (!user) {
      throw new UnauthorizedException("Invalid token");
    }
    return user;
  }
}
