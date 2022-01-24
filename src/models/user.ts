export interface IUser {
  id: number;
  token: string;
  username: string;
  groups?: string[];
  email?: string;
  firstName?: string;
  lastName?: string;
  profile?: string;
}

export interface IGroupResponse {
  id: number;
  name: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}
