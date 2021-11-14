import { IGarbage } from './garbage';
import { IUser } from './user';
import { IVehicle } from './vehicle';

export interface ITaskAmount {
  id: number;
  route: number;
  garbage: IGarbage;
  vehicle?: IVehicle;
  amount: number;
  user?: IUser;
  memo: string;
  timestamp: string;
}
