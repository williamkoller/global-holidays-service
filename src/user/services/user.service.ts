import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { AwsService } from 'src/shared/aws/aws.service'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserRoles } from '../roles/user.roles'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly awsService: AwsService,
  ) {}
  async createAdminUser(data: CreateUserDto, userLoggedIn: User): Promise<User> {
    let cognitoUser = await this.awsService.checkIfUserExists({ email: data.email })
    if (!cognitoUser) {
      cognitoUser = await this.awsService.createCognitoUser(data.email)
    }

    const user = await this.userRepository.save({
      id: cognitoUser.sub,
      roles: [UserRoles.ADMIN],
      name: data.name,
      email: data.email,
      createdBy: userLoggedIn.email,
      updatedBy: userLoggedIn.email,
    })

    return user
  }

  async findByIdWithoutLoggedInUser(id: string): Promise<User> {
    return this.userRepository.findOne({ id })
  }
}
