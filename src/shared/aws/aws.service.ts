import { Inject, Injectable } from '@nestjs/common'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { AuthConfig } from 'src/auth/config/auth.config'
import { CognitoUser } from 'src/auth/interface/cognito-user.interface'

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

  public async registerUser(registerRequest: { name: string; email: string; password: string }) {
    const { email, password } = registerRequest
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
            // Don't verify email addresses
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      })
      .promise()

    return response
  }

  public async checkIfUserExists({ email }: { email: string }): Promise<CognitoUser | undefined> {
    const response = await this.cognito
      .listUsers({
        UserPoolId: this.authConfig.userPoolId,
        Limit: 1,
        Filter: `email="${email}"`,
      })
      .promise()

    return this.formatUser(response.Users[0])
  }

  public async createCognitoUser(email: string): Promise<CognitoUser | undefined> {
    const response = await this.cognito
      .adminCreateUser({
        UserPoolId: this.authConfig.userPoolId,
        Username: email,
        TemporaryPassword: this.passwordGenerator(8),
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            // Don't verify email addresses
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      })
      .promise()
    return this.formatUser(response.User)
  }

  private formatUser(user?: UserType): CognitoUser | undefined {
    return user
      ? {
          sub: user.Username,
          email: user.Attributes.find((attr) => attr.Name === 'email').Value,
        }
      : undefined
  }

  private passwordGenerator(len: number): string {
    const length = len ? len : 10
    const characters = 'abcdefghijklmnopqrstuvwxyz'
    const numeric = '0123456789'
    const punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-='
    let password = ''
    let character = ''
    while (password.length < length) {
      const entity1 = Math.ceil(characters.length * Math.random() * Math.random())
      const entity2 = Math.ceil(numeric.length * Math.random() * Math.random())
      const entity3 = Math.ceil(punctuation.length * Math.random() * Math.random())
      let hold = characters.charAt(entity1)
      hold = password.length % 2 === 0 ? hold.toUpperCase() : hold
      character += hold
      character += numeric.charAt(entity2)
      character += punctuation.charAt(entity3)
      password = character
    }
    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('')
    return password.substr(0, len)
  }
}
