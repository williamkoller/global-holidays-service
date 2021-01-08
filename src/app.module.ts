import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService } from './config/config.service'

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0])],
  controllers: [],
  providers: [],
})
export class AppModule {}
