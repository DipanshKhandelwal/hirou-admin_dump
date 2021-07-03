import { ICollectionPoint } from './collectionPoint';
import { ICustomer } from './customer';
import { IGarbage } from './garbage';

export interface IBaseRoute {
  id: number;
  name: string;
  customer: ICustomer;
  collection_point: [ICollectionPoint];
  garbage: [IGarbage];
}
