import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'

import { User } from 'src/entities/user.entity'
import { AwsService } from 'src/shared/aws/aws.service'
import { UserService } from 'src/user/services/user.service'
import { AuthConfig } from '../config/auth.config'

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool
  constructor(
    @Inject('AuthConfig') private readonly authConfig: AuthConfig,
    private readonly awsService: AwsService,
    private readonly userService: UserService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: authConfig.userPoolId,
      ClientId: authConfig.clientId,
    })
  }

  registerUserCognito(registerRequest: { name: string; email: string; password: string }): Promise<any> {
    const { name, email, password } = registerRequest
    return this.awsService.registerUser({ name, email, password })
  }

  authenticateUser(user: { username: string; password: string }) {
    const { username, password } = user
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    })
    const userData = {
      Username: username,
      Pool: this.userPool,
    }

    const newUser = new CognitoUser(userData)

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: (error) => {
          reject(error)
        },
      })
    })
  }

  async formatUser(payload: any): Promise<User> {
    const user = await this.parseUser(payload)
    return user
  }

  private async parseUser(payload: { name: string; sub: string; email: string }): Promise<User> {
    const user = await this.userService.findByIdWithoutLoggedInUser(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
