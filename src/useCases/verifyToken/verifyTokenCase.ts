import { ITokenProvider } from '../../providers/TokenProvider'

export class VerifyToken {
  private TokenProvider: ITokenProvider

  constructor (tokenProvider: ITokenProvider) {
    this.TokenProvider = tokenProvider
  }

  async execute (token: string) {
    const verificationResult = this.TokenProvider.verify(token)

    return verificationResult
  }
}
