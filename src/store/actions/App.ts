import { IUser } from '../../models/user';
import { LOGIN, LOGOUT, SELECT_ROUTE } from '../actionTypes/App';

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

export const selectRoute = (selectedBaseRouteId?: number) => {
  return {
    type: SELECT_ROUTE,
    payload: selectedBaseRouteId,
  };
};
