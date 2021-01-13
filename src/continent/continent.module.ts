import { Module } from '@nestjs/common'
import { ContinentService } from './services/continent.service'
import { ContinentController } from './controllers/continent.controller'

@Module({
  providers: [ContinentService],
  controllers: [ContinentController],
})
export class ContinentModule {}
