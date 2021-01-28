import { BadGatewayException, BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authenticateRequest: { username: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @Post('register')
  async register(@Body() registerRequest: { name: string; email: string; password: string }): Promise<any> {
    try {
      return this.authService.registerUser(registerRequest);
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }
}
