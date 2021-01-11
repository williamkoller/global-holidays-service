import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { AwsService } from 'src/shared/aws/aws.service'
import { AuthModule } from 'src/auth/auth.module'
import { AuthConfig } from 'src/auth/config/auth.config'

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [AuthConfig, UserService, AwsService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
