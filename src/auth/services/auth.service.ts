import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

import { AwsService } from 'src/shared/aws/aws.service';
import { AuthConfig } from '../config/auth.config';
@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(@Inject('AuthConfig') private readonly authConfig: AuthConfig, private readonly awsService: AwsService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: authConfig.userPoolId,
      ClientId: authConfig.clientId,
    });
  }

  registerUser(registerRequest: { email: string; password: string }): Promise<any> {
    const { email, password } = registerRequest;
    return this.awsService.registerUser({ email, password });
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
}
