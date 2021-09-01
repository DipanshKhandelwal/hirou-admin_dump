import { TASK_REPORT_URL } from '../../constants/urls';
import { ITaskReport } from '../../models/taskReport';
import { hirouAxios } from '../httpInstance';

export async function getTaskReports(
  taskRouteId: number
): Promise<ITaskReport[]> {
  const url = `${TASK_REPORT_URL}?task_route=${taskRouteId}`;
  try {
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Get Task Reports API failed');
  }
}
