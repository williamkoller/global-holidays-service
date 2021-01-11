import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService } from './config/config.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
