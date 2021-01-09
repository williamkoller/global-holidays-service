import { forwardRef, Module } from '@nestjs/common'
import { AwsService } from 'src/shared/aws/aws.service'
import { AuthConfig } from './config/auth.config'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthConfig, AuthService, AwsService],
  exports: [AuthService, AuthConfig],
  controllers: [AuthController],
})
export class AuthModule {}
