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

export async function addTaskReport(data: any): Promise<any> {
  try {
    const url = TASK_REPORT_URL;
    const response = await hirouAxios.post(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Create Task Report API failed');
  }
}

export async function editTaskReport(
  reportId: number,
  data: any
): Promise<any> {
  if (!reportId) throw Error('Please provide report id');

  try {
    const url = `${TASK_REPORT_URL}${reportId}/`;
    const response = await hirouAxios.put(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Update Task Report API failed');
  }
}

export async function deleteTaskReport(reportId: number): Promise<any> {
  if (!reportId) throw Error('Please provide report id');
  try {
    const url = `${TASK_REPORT_URL}${reportId}/`;
    const response = await hirouAxios.delete(url);
    return response.data;
  } catch (e) {
    throw Error('Delete Task Report API failed');
  }
}
