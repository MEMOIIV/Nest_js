import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupSchema, type SignUpDto } from './dto/signup.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod.pipe';
import type { Response } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  signup(@Body() signupDTO: SignUpDto) {
    return this.authService.signup(signupDTO);
  }
}
