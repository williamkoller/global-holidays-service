import { Country } from '../../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  async getAllCountry(): Promise<Country[]> {
    const result = await this.find();
    if (!result) {
      throw new NotFoundException('There is no record');
    }
    return result;
  }
}
