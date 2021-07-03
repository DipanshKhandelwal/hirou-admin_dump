import { IUser } from '../../models/user';
import { login, logout, selectRoute } from '../actions/App';
import store from '../index';

const { dispatch } = store;

export const dispatchLogin = (data: IUser) => dispatch(login(data));

export const dispatchLogout = () => dispatch(logout());

export const dispatchSelectRoute = (selectedBaseRouteId?: number) =>
  dispatch(selectRoute(selectedBaseRouteId));
