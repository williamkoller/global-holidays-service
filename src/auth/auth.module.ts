import { Module } from '@nestjs/common';
import { AwsService } from '@/shared/aws/aws.service';
import { AuthConfig } from '@/auth/config/auth.config';
import { AuthService } from '@/auth/services/auth.service';
import { AuthController } from '@/auth/controllers/auth.controller';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constants/constants';

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
