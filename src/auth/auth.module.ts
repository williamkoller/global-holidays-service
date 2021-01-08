import { Module } from '@nestjs/common'
import { AwsService } from 'src/shared/aws/aws.service'
import { AuthConfig } from './config/auth.config'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'

@Module({
  imports: [],
  providers: [AuthConfig, AuthService, AwsService],
  controllers: [AuthController],
})
export class AuthModule {}
