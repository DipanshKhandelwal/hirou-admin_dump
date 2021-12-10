import { IGarbage } from './garbage';
import { ITaskAmountItem } from './taskAmountItem';
import { IUser } from './user';
import { IVehicle } from './vehicle';

export interface ITaskAmount {
  id: number;
  route: number;
  memo: string;
  user?: IUser;
  vehicle?: IVehicle;
  timestamp: string;
  deal_type: string;
  work_type: string;
  amount_item: Array<ITaskAmountItem>;
}
