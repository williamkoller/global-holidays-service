import { Module } from '@nestjs/common'
import { AwsService } from 'src/shared/aws/aws.service'
import { AuthConfig } from './config/auth.config'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../auth/constants/constants'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthConfig, AuthService, AwsService, JwtStrategy],
  exports: [AuthService, AuthConfig, AwsService],
  controllers: [AuthController],
})
export class AuthModule {}
