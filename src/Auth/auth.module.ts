import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from 'src/DB/models/User.model';

@Module({
  imports: [UserModel],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
