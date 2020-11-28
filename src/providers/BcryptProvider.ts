export interface IBcryptProvider {
  compare: (data: string, passwordHash: string) => Promise<Boolean>;
}
