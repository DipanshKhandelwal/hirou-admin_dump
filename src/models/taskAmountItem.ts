import { IGarbage } from './garbage';

export interface ITaskAmountItem {
  id: number;
  garbage: IGarbage;
  gross_weight: number;
  vehicle_weight: number;
  net_weight: number;
}
