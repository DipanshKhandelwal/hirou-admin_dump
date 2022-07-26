import { ITaskCollectionPoint } from './taskCollectionPoint';
import { ICustomer } from './customer';
import { IGarbage } from './garbage';

export interface ITaskRoute {
  id: number;
  name: string;
  customer: ICustomer;
  task_collection_point: ITaskCollectionPoint[];
  garbage: [IGarbage];
  date: string;
}
