import { ITaskCollection } from './taskCollection';

export interface ITaskCollectionPoint {
  id: number;
  name: string;
  location: string;
  address: string;
  memo: string;
  route: number;
  sequence: number;
  image: string;
  task_collection: ITaskCollection[];
}
