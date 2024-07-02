import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { LoginDto } from '../dto';
import { JwtAuthGuard } from '../../guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyHash(@Body() body: LoginDto) {
    return this.authService.validateUser(body);
  }

  @Get('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
