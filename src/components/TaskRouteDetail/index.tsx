import React, { useMemo, useState, useEffect } from 'react';
import {
  Container,
  Heading,
  HStack,
  useToast,
  Spinner,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { navigate } from '../../services/navigation';
import { handleFetchUpdatedTaskRoute } from '../../store/thunks/TaskRoute';
import { _taskRoute } from '../../store/selectors/TaskRoute';
import { ITaskRoute } from '../../models/taskRoute';
import { useParams } from 'react-router-dom';
import { getTaskReports } from '../../services/apiRequests/taskReports';
import { ITaskReport } from '../../models/taskReport';
import { TaskReportList } from '../TaskReportList';
import { ITaskAmount } from '../../models/taskAmount';
import { getTaskAmounts } from '../../services/apiRequests/taskAmounts';
import { TaskAmountList } from '../TaskAmountList';
import { TaskRouteDetailsTable } from './components/TaskRouteDetailsTable';
import { _isAdmin } from '../../store/selectors/App';
import { formatTaskName } from '../../utils/formatName';
import { FaRoute } from 'react-icons/fa';
import { getJapaneseStringDate } from '../../utils/date';
import { IGarbage } from '../../models/garbage';

export const TaskRouteDetail = () => {
  const { taskRouteId }: { taskRouteId: string } = useParams();
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

  const goToRouteMap = () => navigate(`/task-routes/map/${route.id}`);

  return (
    <Container maxW='container.lg' pb={6}>
      <HStack marginBottom={5} justifyContent='space-between'>
        <Heading textAlign='start'>
          {route.name ? formatTaskName(route.name) : 'Task name'}
        </Heading>
      </HStack>
      <HStack my={4}>
        <Button
          alignSelf='flex-start'
          rightIcon={<FaRoute />}
          variant='outline'
          onClick={goToRouteMap}
        >
          マップを開く
        </Button>
      </HStack>

      <Table my={6} size='sm' variant='simple'>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>ルート名</Th>
            <Th>顧客</Th>
            <Th>品目</Th>
            <Th>作成日</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            key={route.id}
            _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
          >
            <Td>{route.id}</Td>
            <Td>{formatTaskName(route.name)}</Td>
            <Td>{route.customer?.name ?? '--'}</Td>
            <Td>
              {route.garbage
                .map((_garbage: IGarbage) => _garbage.name)
                .join(', ')}
            </Td>
            <Td>{getJapaneseStringDate(route.date)}</Td>
          </Tr>
        </Tbody>
      </Table>

      <Tabs variant='enclosed'>
        <TabList>
          <Tab>收集状況</Tab>
          {isAdmin &&
            <><Tab>報告</Tab>
              <Tab>搬入量</Tab>
            </>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <TaskRouteDetailsTable route={route} />
          </TabPanel>
          <TabPanel>
            {isAdmin && (<TaskReportList taskRoute={route} reportsList={taskreports} />)}
          </TabPanel>
          <TabPanel>
            {isAdmin && (<TaskAmountList taskRoute={route} amountsList={taskAmounts} />)}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
