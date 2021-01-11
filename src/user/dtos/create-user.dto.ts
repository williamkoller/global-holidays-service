import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { IRolesContainer } from '../interfaces/roles-container.interface'
import { UserRoles } from '../roles/user.roles'

export class CreateUserDto implements IRolesContainer {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  readonly password: string

  @IsNotEmpty()
  readonly roles: UserRoles[]
}
