import { REPORT_TYPE_URL } from '../../constants/urls';
import { ITaskReportType } from '../../models/taskReportType';
import { hirouAxios } from '../httpInstance';

export async function getReportTypes(): Promise<ITaskReportType[]> {
  try {
    const url = REPORT_TYPE_URL;
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Report Type API failed');
  }
}
