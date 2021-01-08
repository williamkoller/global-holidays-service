import { BadGatewayException, BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { RegisterRequestDto } from '../dtos/register-request.dto'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authenticateRequest: { username: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Post('register')
  async register(@Body() registerRequestDto: RegisterRequestDto): Promise<{ UserSub: string }> {
    try {
      return this.authService.registerUserCognito(registerRequestDto)
    } catch (e) {
      throw new BadGatewayException(e.message)
    }
  }
}
