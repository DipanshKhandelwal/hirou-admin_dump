import * as React from 'react';
import { Box, Flex, Center, Text, useToast } from '@chakra-ui/react';

import { getTaskRoute } from '../../services/apiRequests/taskRoute';

import { useState, useCallback } from 'react';
import { TaskCollectionPointListItem } from './components/TaskCollectionPointListItem';
import TaskRouteMap from './components/TaskRouteMap';
import { useParams } from 'react-router-dom';
import { navigate } from '../../services/navigation';
import { ITaskRoute } from '../../models/taskRoute';
import { ITaskCollectionPoint } from '../../models/taskCollectionPoint';
import {
  TASK_COLLECTION_POINT_URL,
  TASK_COLLECTION_URL,
} from '../../constants/urls';
import { ITaskCollection } from '../../models/taskCollection';
import { hirouAxios } from '../../services/httpInstance';

// TODO: Connect socket
export const CreateTaskRoute = () => {
  const [localCollectionPoints, setLocalCollectionPoints] = useState<
    ITaskCollectionPoint[]
  >([]);
  const toast = useToast();

  const [route, setRoute] = useState<ITaskRoute | null>(null);
  const [locationFocus, setLocationFocus] =
    useState<ITaskCollectionPoint | null>(null);

  const { taskRouteId }: { taskRouteId: string } = useParams();
  const selectedRouteId = Number(taskRouteId);

  const init = useCallback(async () => {
    // try fetching the task route else redirect to list
    try {
      const data = await getTaskRoute(selectedRouteId);
      setRoute(data);
    } catch (e) {
      toast({
        title: 'Incorrct route',
        description: 'please select an existing route',
        status: 'error',
      });
      navigate('/list');
    }
  }, [selectedRouteId, toast]);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    const cps = route?.task_collection_point.sort(
      (a: ITaskCollectionPoint, b: ITaskCollectionPoint) => {
        return a.sequence - b.sequence;
      }
    );
    setLocalCollectionPoints(cps ?? []);
  }, [route]);

  const toggleTaskLocal = (updatedTask: ITaskCollection, tcpId: number) => {
    const localCollectionPointsCopy = Array.from(localCollectionPoints);
    localCollectionPointsCopy.forEach((tcp) => {
      if (tcp.id === tcpId) {
        const localCollectionsCopy = Array.from(tcp.task_collection);
        localCollectionsCopy.forEach((tc) => {
          if (tc.id === updatedTask.id) tc.complete = updatedTask.complete;
        });
        tcp.task_collection = localCollectionsCopy;
      }
    });
    setLocalCollectionPoints(localCollectionPointsCopy);
  };

  const toggleAllTasksLocal = (
    updatedTasks: ITaskCollection[],
    tcpId: number
  ) => {
    const localCollectionPointsCopy = Array.from(localCollectionPoints);
    localCollectionPointsCopy.forEach((tcp) => {
      if (tcp.id === tcpId) tcp.task_collection = updatedTasks;
    });
    setLocalCollectionPoints(localCollectionPointsCopy);
  };

  const onToggleTask = async (
    taskCollection: ITaskCollection,
    tcpId: number
  ) => {
    try {
      const url = `${TASK_COLLECTION_URL}${taskCollection.id}/`;
      const data = await hirouAxios.put(url, {
        complete: !taskCollection.complete,
      });
      toggleTaskLocal(data.data, tcpId);
    } catch (e) {
      toast({
        title: 'Error updating collection',
        description: 'please try again',
        status: 'error',
      });
    }
  };

  const collectionPointsList = localCollectionPoints?.map(
    (taskCollectionPoint: ITaskCollectionPoint, index: number) => {
      const onToggleAllTasks = async () => {
        try {
          const url = `${TASK_COLLECTION_POINT_URL}${taskCollectionPoint.id}/bulk_complete/`;
          const data = await hirouAxios.post(url, {});
          toggleAllTasksLocal(data.data, taskCollectionPoint.id);
        } catch (e) {
          toast({
            title: 'Error updating collection',
            description: 'please try again',
            status: 'error',
          });
        }
      };

      const onClickPoint = () => {
        if (taskCollectionPoint.location) {
          setLocationFocus(taskCollectionPoint);
        }
      };

      return (
        <TaskCollectionPointListItem
          isSelected={taskCollectionPoint.id === locationFocus?.id}
          toggleAllTasks={onToggleAllTasks}
          toggleTask={onToggleTask}
          key={taskCollectionPoint.id}
          taskCollectionPoint={taskCollectionPoint}
          onClickPoint={onClickPoint}
        />
      );
    }
  );

  return (
    <Flex backgroundColor='white' height='inherit'>
      <Box flex='1' minWidth='300px' overflowY='scroll'>
        {localCollectionPoints.length === 0 && (
          <Text>No Collection Points</Text>
        )}
        {collectionPointsList}
      </Box>
      <Center flex='4'>
        {/* can optimize it, no need to send route only send tcps which can help remove extra route state*/}
        <TaskRouteMap
          baseRoute={route}
          locationFocus={locationFocus}
          setLocationFocus={setLocationFocus}
        />
      </Center>
    </Flex>
  );
};
