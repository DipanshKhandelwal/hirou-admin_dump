import { ITaskReportType } from './taskReportType';

export interface ITaskReport {
  id: number;
  description: string;
  report_type: ITaskReportType;
  route: number;
  task_collection_point: number;
  timestamp: string;
  image?: string;
}
