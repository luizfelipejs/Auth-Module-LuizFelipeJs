import { IToken } from '../../core/entities'
import { IUserRepository } from '../../core/repositories'
import { IBcryptProvider } from '../../providers/BcryptProvider'
import { GenerateToken } from '../generateToken/generateTokenCase'

export class Authenticate {
  private IUserRepository: IUserRepository
  private GenerateTokenCase: GenerateToken
  private IBcryptProvider: IBcryptProvider

  constructor (
    IUserRepository: IUserRepository,
    generateToken: GenerateToken,
    IBcryptProvider: IBcryptProvider
  ) {
    this.IUserRepository = IUserRepository
    this.GenerateTokenCase = generateToken
    this.IBcryptProvider = IBcryptProvider
  }

  async execute (id: any, password: string, optionsToken: any): Promise<IToken | Error> {
    const userFound = await this.IUserRepository.findUserByID(id)
    const comparePassword = await this.IBcryptProvider.compare(password, userFound.password)
    const token = await this.GenerateTokenCase.execute({ id: userFound.id }, optionsToken)

    if (comparePassword) {
      return token
    }

    throw new Error('Invalid Password')
  }
}
