import { Country } from '@/entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Country)
export class LoadAllCountryRepository extends Repository<Country> {
  async loadAllCountry(): Promise<Country[]> {
    return await this.find();
  }
}
