import * as React from 'react';
import {
  Container,
  Heading,
  HStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { navigate } from '../../services/navigation';
import { handleFetchUpdatedTaskRoute } from '../../store/thunks/TaskRoute';
import { _taskRoute } from '../../store/selectors/TaskRoute';
import { ITaskRoute } from '../../models/taskRoute';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useState } from 'react';
import { getTaskReports } from '../../services/apiRequests/taskReports';
import { ITaskReport } from '../../models/taskReport';
import { TaskReportList } from '../TaskReportList';
import { ITaskAmount } from '../../models/taskAmount';
import { getTaskAmounts } from '../../services/apiRequests/taskAmounts';
import { TaskAmountList } from '../TaskAmountList';
import { TaskRouteDetailsTable } from './components/TaskRouteDetailsTable';
import { _isAdmin } from '../../store/selectors/App';

export const TaskRouteDetail = () => {
  let { taskRouteId }: { taskRouteId: string } = useParams();
  const selectedRouteId = Number(taskRouteId);

  const toast = useToast();
  const taskRoutesData: number = useSelector(_taskRoute);
  const isAdmin: boolean = useSelector(_isAdmin);

  const [taskreports, setTaskReports] = useState<ITaskReport[]>([]);
  const [taskAmounts, setTaskAmounts] = useState<ITaskAmount[]>([]);

  const route: ITaskRoute = useMemo(() => {
    const taskRoute = taskRoutesData.data.find(
      (taskRoute: ITaskRoute) => taskRoute.id === selectedRouteId
    );
    return taskRoute;
  }, [taskRoutesData, selectedRouteId]);

  useEffect(() => {
    async function getReports() {
      try {
        const reportsData: ITaskReport[] = await getTaskReports(
          selectedRouteId
        );
        setTaskReports(reportsData);
      } catch (e) {
        toast({
          title: 'Error fetching task reports',
          description: '',
          status: 'error',
        });
      }
    }

    async function getAmounts() {
      try {
        const amounts: ITaskAmount[] = await getTaskAmounts(selectedRouteId);
        setTaskAmounts(amounts);
      } catch (e) {
        toast({
          title: 'Error fetching task amounts',
          description: '',
          status: 'error',
        });
      }
    }

    getReports();
    getAmounts();
  }, [route, toast]);

  useEffect(() => {
    async function init() {
      // try fetching the route else redirect to list
      try {
        await handleFetchUpdatedTaskRoute(selectedRouteId);
      } catch (e) {
        toast({
          title: 'Incorrct route',
          description: 'please select an existing task route',
          status: 'error',
        });
        navigate('/list');
      }
    }

    init();
  }, [selectedRouteId, setTaskReports, toast]);

  if (!route) return <Spinner />;

  return (
    <Container maxW='container.lg' pb={6}>
      <HStack marginBottom={5} justifyContent='space-between'>
        <Heading textAlign='start'>{route.name ?? 'Task name'}</Heading>
      </HStack>
      <TaskRouteDetailsTable route={route} />
      {isAdmin && (
        <>
          <TaskReportList taskRoute={route} reportsList={taskreports} />
          <TaskAmountList taskRoute={route} amountsList={taskAmounts} />
        </>
      )}
    </Container>
  );
};
