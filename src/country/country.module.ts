import { forwardRef, Module } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { CountryController } from './controllers/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/country.entity';
import { ContinentModule } from 'src/continent/continent.module';
import { LoadAllCountryRepository } from './repositories/load-all-country/load-all-country.repository';
import { AddCountryRepository } from './repositories/add-country/add-country.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), forwardRef(() => ContinentModule)],
  providers: [CountryService, LoadAllCountryRepository, AddCountryRepository],
  controllers: [CountryController],
})
export class CountryModule {}
