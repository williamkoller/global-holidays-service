import { Country } from '../../../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCountryDto } from '../../dtos/create-country.dto';

@EntityRepository(Country)
export class AddCountryRepository extends Repository<Country> {
  async addCountry(data: CreateCountryDto): Promise<Country> {
    return await this.save(data);
  }
}
