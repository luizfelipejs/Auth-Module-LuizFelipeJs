/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { IUserRepository } from '../core/repositories'
import { hash } from 'bcrypt'
import {
  BcryptProvider,
  TokenProvider,
  GenerateToken,
  Authenticate,
  VerifyToken
} from '../index'
import { IToken } from '../core/entities/index'

let userRepository: any
let tokenProvider: TokenProvider
let bcryptProvider: BcryptProvider
let generateToken: GenerateToken
let verifyToken: VerifyToken
let authenticate: Authenticate
let tokenForTest: IToken

const users = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@example.com',
    password: 'password'
  }
]

beforeAll(async () => {
  class UserRepository implements IUserRepository {
    async findUserByID (id: any): Promise<any> {
      return users.filter(user => user.id === id)[0]
    }
  }

  userRepository = new UserRepository()
  tokenProvider = new TokenProvider('SECRET_KEY')
  bcryptProvider = new BcryptProvider()
  generateToken = new GenerateToken(tokenProvider)
  verifyToken = new VerifyToken(tokenProvider)
  authenticate = new Authenticate(userRepository, generateToken, bcryptProvider)
  tokenForTest = await generateToken.execute({ id: 1 }, { expiresIn: '1h' })

  users[0].password = await hash('password', 10)
})

describe('Tests with token', () => {
  test('Gerando Token', () => {
    expect(tokenForTest.token).toBe(tokenForTest.token)
  })

  test('logar usuario', async () => {
    const result = await authenticate.execute(1, 'password', { expiresIn: '1h' })

    expect(result).toBe(result)
  })

  test('Verificando token', async () => {
    expect(await verifyToken.execute(tokenForTest.token)).toBe(true)
  })
})
