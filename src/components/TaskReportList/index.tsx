import React, { useState, useMemo } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Heading,
  Button,
  Image,
  useToast,
} from '@chakra-ui/react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { ITaskReport } from '../../models/taskReport';
import { TaskReportDetailModal } from '../TaskReportDetailModal';
import { AddReportModal } from './components/AddReportModal';
import { ITaskRoute } from '../../models/taskRoute';
import { TaskReportDeleteConfirmationModal } from './components/TaskReportDeleteConfirmationModal';
import { deleteTaskReport } from '../../services/apiRequests/taskReports';
import { handleFetchUpdatedTaskRoute } from '../../store/thunks/TaskRoute';
import { getDateTimeString, getJapaneseDateString } from '../../utils/date';
import { ITaskCollectionPoint } from '../../models/taskCollectionPoint';

function getCollectionPointText(tcp: ITaskCollectionPoint | undefined) {
  if (!tcp) return '';
  return `${tcp?.sequence} [${tcp?.name}]`
}

export const TaskReportList = ({
  reportsList,
  taskRoute,
}: {
  reportsList: ITaskReport[];
  taskRoute: ITaskRoute;
}) => {
  const { task_collection_point } = taskRoute

  const tcpMap = useMemo(() => {
    let newTcpMap: any = {}
    task_collection_point.forEach((tcp: ITaskCollectionPoint) => {
      newTcpMap[tcp.id] = tcp
    })
    return newTcpMap
  }, [task_collection_point])

  const toast = useToast();

  const [selectedTaskReport, setSelectedTaskReport] = useState<ITaskReport | undefined>(undefined);

  const [isAddReportModalOpen, setAddReportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const addReportModalOpen = () => setAddReportModalOpen(true);

  const cancelRef = React.useRef();

  const onDeleteIconClicked = (reportId: number) => {
    const _taskReport = getReportFromId(reportId);
    if (_taskReport) {
      setSelectedTaskReport(_taskReport);
      setIsDeleteModalOpen(true);
    }
  };

  const onDelete = async () => {
    if (selectedTaskReport !== null) {
      try {
        await deleteTaskReport(selectedTaskReport!.id);
        handleFetchUpdatedTaskRoute(taskRoute.id);
        toast({
          title: 'Task report deleted',
          description: '',
        });
      } catch {
        toast({
          title: 'Error deleting task report',
          description: 'please try again',
          status: 'error',
        });
      }
    }
    onDeleteModalClose();
  };

  const onDeleteModalClose = () => {
    setSelectedTaskReport(undefined);
    setIsDeleteModalOpen(false);
  };

  const onEditIconClicked = (reportId: number) => {
    const _taskReport = getReportFromId(reportId);
    if (_taskReport) {
      setAddReportModalOpen(true);
      setSelectedTaskReport(_taskReport);
    }
  };

  const onEditModalClose = () => {
    setSelectedTaskReport(undefined);
    setAddReportModalOpen(false);
  };

  const getReportFromId = (reportId: number) =>
    reportsList.find(
      (taskReportItem: ITaskReport) => reportId === taskReportItem.id
    );

  return (
    <>
      <TaskReportDetailModal
        isOpen={
          !!selectedTaskReport && !isAddReportModalOpen && !isDeleteModalOpen
        }
        onClose={() => setSelectedTaskReport(undefined)}
        taskReport={selectedTaskReport}
      />
      <TaskReportDeleteConfirmationModal
        taskReport={selectedTaskReport}
        onAccept={onDelete}
        cancelRef={cancelRef}
        onCancel={onDeleteModalClose}
        isOpen={isDeleteModalOpen}
      />
      <AddReportModal
        selectedTaskReport={selectedTaskReport}
        taskRoute={taskRoute}
        isOpen={isAddReportModalOpen}
        onClose={onEditModalClose}
      />
      <HStack marginBottom={4} justifyContent='space-between'>
        <Button onClick={addReportModalOpen}>追加</Button>
      </HStack>
      <Table size='sm' variant='simple'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>集積所番号</Th>
            <Th>種類</Th>
            <Th>作成日</Th>
            <Th>内容</Th>
            <Th>画像</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reportsList?.map((taskReport: ITaskReport, idx: number) => (
            <Tr
              key={taskReport.id}
              _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
              onClick={() => setSelectedTaskReport(taskReport)}
            >
              <Td>{idx + 1}</Td>
              <Td>{getCollectionPointText(tcpMap?.[taskReport?.task_collection_point])}</Td>
              <Td>{taskReport.report_type.name}</Td>
              <Td>{getJapaneseDateString(taskReport.timestamp)}</Td>
              <Td>{taskReport.description}</Td>
              <Td>
                <Image
                  cursor='pointer'
                  boxSize='25px'
                  borderRadius={5}
                  objectFit='cover'
                  src={taskReport?.image ?? 'https://via.placeholder.com/150'}
                  alt='image'
                />
              </Td>
              <Td>
                <HStack>
                  <Button
                    size='sm'
                    colorScheme='blue'
                    onClick={(e: any) => {
                      e.stopPropagation();
                      onEditIconClicked(taskReport.id);
                    }}
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    size='sm'
                    colorScheme='red'
                    onClick={(e: any) => {
                      e.stopPropagation();
                      onDeleteIconClicked(taskReport.id);
                    }}
                  >
                    <MdDeleteForever />
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
