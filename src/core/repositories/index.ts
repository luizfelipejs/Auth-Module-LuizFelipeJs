export interface IUserRepository {
  findUserByID (id: any): Promise<any>
}
