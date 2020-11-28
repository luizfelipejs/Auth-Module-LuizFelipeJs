import { IBcryptProvider } from '../../providers/BcryptProvider'
import { compare } from 'bcrypt'

export default class BcryptProvider implements IBcryptProvider {
  async compare (data: string, passwordHash: string): Promise<Boolean> {
    const resultOfComparePasswords = await compare(data, passwordHash)

    return resultOfComparePasswords
  }
}
