import { Inject, Injectable } from '@nestjs/common'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'

import { AuthConfig } from 'src/auth/config/auth.config'
import { CreateCognitoUserDto } from '../dtos/create-cognito-user.dto'

@Injectable()
export class AwsService {
  private userPool: CognitoUserPool
  private cognito: CognitoIdentityServiceProvider
  constructor(@Inject('AuthConfig') private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: authConfig.userPoolId,
      ClientId: authConfig.clientId,
    })
    this.cognito = new CognitoIdentityServiceProvider({
      region: this.authConfig.region,
      accessKeyId: this.authConfig.cognitoAccessKeyId,
      secretAccessKey: this.authConfig.cognitoSecretAccessKey,
    })
  }

  public async registerUser(registerRequest: { email: string; password: string }): Promise<{ UserSub: string }> {
    const { email, password } = registerRequest
    return this.cognito
      .signUp({
        ClientId: this.authConfig.clientId,
        Username: email,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
      })
      .promise()
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
        onFailure: (err) => {
          reject(err)
        },
      })
    })
  }

  public async checkIfUserExists({ email }: { email: string }): Promise<any> {
    const response = await this.cognito
      .listUsers({
        UserPoolId: this.authConfig.userPoolId,
        Limit: 1,
        Filter: `email="${email}"`,
      })
      .promise()

    return response
  }

  public async createCognitoUser(createCognitoUserDto: CreateCognitoUserDto): Promise<any> {
    const { email, password } = createCognitoUserDto
    const response = await this.cognito
      .adminCreateUser({
        UserPoolId: this.authConfig.userPoolId,
        Username: email,
        TemporaryPassword: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      })
      .promise()
    return response
  }
}
