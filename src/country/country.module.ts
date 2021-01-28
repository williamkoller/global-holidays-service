import { forwardRef, Module } from '@nestjs/common';
import { CountryController } from '@/country/controllers/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '@/entities/country.entity';
import { ContinentModule } from '@/continent/continent.module';
import { LoadAllCountryRepository, AddCountryRepository } from './repositories/export';
import { LoadAllCountryService, AddCountryService } from '@/country/services/export';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), forwardRef(() => ContinentModule)],
  providers: [AddCountryService, LoadAllCountryService, LoadAllCountryRepository, AddCountryRepository],
  controllers: [CountryController],
})
export class CountryModule {}
