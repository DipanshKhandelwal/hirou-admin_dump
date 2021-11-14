import { IGarbage } from './garbage';

export interface ITaskCollection {
  id: number;
  image: string | null;
  timestamp: string | null;
  vehicle: number | null;
  users: number | null;
  amount: number;
  available: boolean;
  complete: boolean;
  collection_point: number;
  garbage: IGarbage;
}
