import { IsArray, IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Country } from 'src/entities/country.entity';

export class CreateContinentDto {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  name: string;

  @IsJSON()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  area: {
    kilometers: number;
    percentage: number;
  };

  @IsJSON()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  population: {
    approximate: number;
    percentage: number;
  };

  @IsArray()
  contries: Country[];

  @IsNumber()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  totalContries: number;
}
