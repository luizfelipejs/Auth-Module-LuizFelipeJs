import { sign, verify } from 'jsonwebtoken'
import { ITokenProvider } from '../../providers/TokenProvider'

export default class TokenProvider implements ITokenProvider {
  secret: string;

  constructor (secret: string) {
    this.secret = secret
  }

  sign (payload: any, options: any): string {
    const token = sign(payload, this.secret, options)

    return token
  }

  verify (token: string): true | false {
    try {
      verify(token, this.secret)
      return true
    } catch (err) {
      console.log(`Internal Error: ${err.message}`)
      return false
    }
  }
}
