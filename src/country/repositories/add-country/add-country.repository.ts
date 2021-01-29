import { Country } from '@/entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCountryDto } from '@/country/dtos/create-country.dto';
import { validateOrReject } from 'class-validator';

@EntityRepository(Country)
export class AddCountryRepository extends Repository<Country> {
  async addCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = Object.assign({} as Country, createCountryDto);
    await validateOrReject(createCountryDto);
    return await this.save(country);
  }
}
