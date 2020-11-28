import { IToken } from '../../core/entities'
import { ITokenProvider } from '../../providers/TokenProvider'

export class GenerateToken {
  private TokenProvider: ITokenProvider

  constructor (provider: ITokenProvider) {
    this.TokenProvider = provider
  }

  async execute (payload: any, options: any): Promise<IToken> {
    const token = this.TokenProvider.sign(payload, options)

    return {
      gernerated_date: new Date(),
      token: token,
      payload: payload,
      expires_in: options.expiresIn
    }
  }
}
