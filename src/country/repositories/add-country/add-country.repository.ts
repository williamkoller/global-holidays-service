import { Country } from '../../../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCountryDto } from '../../dtos/create-country.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Country)
export class AddCountryRepository extends Repository<Country> {
  async addCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    try {
      return await this.save(createCountryDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
