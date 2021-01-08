import { Inject, Injectable } from '@nestjs/common'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { AuthConfig } from 'src/auth/config/auth.config'
import { AuthRegisterDto } from '../dtos/auth-register.dto'

@Injectable()
export class AwsService {
  private readonly userPool: CognitoUserPool
  private readonly cognito: CognitoIdentityServiceProvider
  constructor(@Inject('AuthConfig') private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: authConfig.userPoolId,
      ClientId: authConfig.clientId,
    })
  }

  public async registerUserCognito(authRegisterDto: AuthRegisterDto): Promise<{ UserSub: string }> {
    const { email, password } = authRegisterDto
    return this.cognito
      .signUp({
        ClientId: this.authConfig.clientId,
        Username: email,
        Password: password,
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
  }
}
