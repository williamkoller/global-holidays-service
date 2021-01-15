import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Continent } from 'src/entities/continent.entity';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  capitalContry: string;

  @IsNumber()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  territorialExtension: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  localization: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  language: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  currency: string;

  @IsObject()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  continent: Continent;
}
