import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseService } from 'src/firebase/firebase.config';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, FirebaseService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, FirebaseService, JwtStrategy],
})
export class AuthModule {

}
