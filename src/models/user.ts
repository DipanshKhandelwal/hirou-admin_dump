export interface IUser {
  id: number;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  profile: string;
  username: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}
