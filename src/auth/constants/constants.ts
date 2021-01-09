import * as Axios from 'axios'
import * as jwkToPem from 'jwk-to-pem'

export const getPem = async (kid: string, cognitoIssuer: string) => {
  const jwkUrl = `${cognitoIssuer}/.well-known/jwks.json`

  const publicKeys = await Axios.default.get(jwkUrl)
  const keys = publicKeys.data.keys.reduce((agg, current) => {
    const pem = jwkToPem(current)
    agg[current.kid] = { instance: current, pem }
    return agg
  }, {})
  return keys[kid]
}

export const jwtConstants = {
  secret: 'v%re$1%3432F',
}
