import { IUser } from '../../models/user';
import { LOGIN, LOGOUT } from '../actionTypes/App';

export const login = (data: IUser) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
