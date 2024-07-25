import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.config';


@Injectable()
export class AuthService {
    constructor(private firebaseService: FirebaseService) { }

    async validateToken(token: string): Promise<any> {
        try {
            const decodedToken = await this.firebaseService.getAuth().verifyIdToken(token);
            return decodedToken;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
