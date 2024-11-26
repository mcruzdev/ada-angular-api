import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('sign-in')
export class SignUpController {
  @Post()
  signUp(@Res() res: Response, @Body() req: SignInRequest) {
    if (req.email === 'email@email.com' && req.password === 'pass@@') {
      return res.status(HttpStatus.OK).json({
        token: 'JbuSNASAU9',
      });
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({
      title: 'Unauthorized',
      message: 'The email or password provided is incorrect. Please try again.',
    });
  }
}

interface SignInRequest {
  email: string;
  password: string;
}
