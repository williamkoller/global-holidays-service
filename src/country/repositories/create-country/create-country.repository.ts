import { Country } from '../../../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Country)
export class CreateCountryRepository extends Repository<Country> {}
