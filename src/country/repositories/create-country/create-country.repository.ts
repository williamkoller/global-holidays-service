import { Country } from '../../../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCountryDto } from 'src/country/dtos/create-country.dto';

@EntityRepository(Country)
export class CreateCountryRepository extends Repository<Country> {
  async createCountry(data: CreateCountryDto): Promise<Country> {
    return await this.save(data);
  }
}
