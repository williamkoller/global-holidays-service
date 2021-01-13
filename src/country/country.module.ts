import { forwardRef, Module } from '@nestjs/common'
import { CountryService } from './services/country.service'
import { CountryController } from './controllers/country.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from 'src/entities/country.entity'
import { ContinentModule } from 'src/continent/continent.module'
import { CountryRepository } from './repositories/country.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Country]), forwardRef(() => ContinentModule)],
  providers: [CountryService, CountryRepository],
  controllers: [CountryController],
})
export class CountryModule {}
