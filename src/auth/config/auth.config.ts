import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public secretKey = 'super-secret-key';
  public userPoolId: string = process.env.COGNITO_USER_POOL_ID;
  public clientId: string = process.env.COGNITO_CLIENT_ID;
  public region: string = process.env.COGNITO_REGION;
  public cognitoAccessKeyId: string = process.env.COGNITO_ACCESS_KEY_ID;
  public cognitoSecretAccessKey: string = process.env.COGNITO_SECRET_ACCESS_KEY;
  public authority = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
}
