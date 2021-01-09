import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { AuthConfig } from '../config/auth.config'
import { getPem } from '../constants/constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly cognitoIssuer: string
  private tokenHeader: string
  constructor(private readonly authService: AuthService, private readonly authConfig: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: async (request, jwtToken, done) => {
        this.tokenHeader = jwtToken

        const tokenSections = (jwtToken || '').split('.')
        const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8')
        const header = JSON.parse(headerJSON)

        const secret = await getPem(header.kid, authConfig.authority)
        done(null, secret.pem)
      },
    })
  }

  public async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException()
    }
    const user = await this.authService.formatUser(payload)
    return user
  }
}