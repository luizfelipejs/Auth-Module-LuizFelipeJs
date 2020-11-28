export interface ITokenProvider {
  secret: string;
  sign (payload: any, options: any): string;
  verify (token: string): true | false;
}
