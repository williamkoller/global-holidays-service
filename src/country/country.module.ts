import { forwardRef, Module } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { CountryController } from './controllers/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/country.entity';
import { ContinentModule } from 'src/continent/continent.module';
import { FindCountryRepository } from './repositories/find-country/find-country.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), forwardRef(() => ContinentModule)],
  providers: [CountryService, FindCountryRepository],
  controllers: [CountryController],
})
export class CountryModule {}
