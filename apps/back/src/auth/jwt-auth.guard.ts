import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private authService: AuthService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        if (!token) {
            return false;
        }
        const user = await this.authService.validateToken(token);
        if (!user) {
            return false;
        }
        request.user = user;
        return true;
    }   
        
}
