import { Inject, Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

import { AuthConfig } from 'src/auth/config/auth.config';

export interface ICognitoUser {
  sub: string;
  email: string;
}

@Injectable()
export class AwsService {
  private userPool: CognitoUserPool;
  private cognito: CognitoIdentityServiceProvider;
  constructor(@Inject('AuthConfig') private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: authConfig.userPoolId,
      ClientId: authConfig.clientId,
    });
    this.cognito = new CognitoIdentityServiceProvider({
      region: this.authConfig.region,
      accessKeyId: this.authConfig.cognitoAccessKeyId,
      secretAccessKey: this.authConfig.cognitoSecretAccessKey,
    });
  }

  public async registerUser(registerRequest: { email: string; password: string }): Promise<{ UserSub: string }> {
    const { email, password } = registerRequest;
    return this.cognito
      .signUp({
        ClientId: this.authConfig.clientId,
        Username: email,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
      })
      .promise();
  }

  authenticateUser(user: { username: string; password: string }) {
    const { username, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  public async checkIfUserExists(email: { email: string }): Promise<any> {
    const response = await this.cognito
      .listUsers({
        UserPoolId: this.authConfig.userPoolId,
        Limit: 1,
        Filter: `email="${email}"`,
      })
      .promise();

    return response;
  }

  public async createCognitoUser(email: string, password: string): Promise<any> {
    return this.cognito
      .signUp({
        ClientId: this.authConfig.clientId,
        Username: email,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
      })
      .promise();
  }

  private passwordGenerator(len: number): string {
    const length = len ? len : 10;
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const numeric = '0123456789';
    const punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    let character = '';
    while (password.length < length) {
      const entity1 = Math.ceil(characters.length * Math.random() * Math.random());
      const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
      const entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
      let hold = characters.charAt(entity1);
      hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
      character += hold;
      character += numeric.charAt(entity2);
      character += punctuation.charAt(entity3);
      password = character;
    }
    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    return password.substr(0, len);
  }
}
