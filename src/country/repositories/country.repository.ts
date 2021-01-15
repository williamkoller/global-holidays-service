import { Country } from '../../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  async getAllCountry(): Promise<Country[]> {
    const result = await this.find();
    if (!result) {
      throw new BadRequestException('The Country not found.');
    }
    return result;
  }
}
