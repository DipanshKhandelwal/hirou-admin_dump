import * as React from 'react';
import { Box, Text, HStack, VStack, Button } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { ITaskCollectionPoint } from '../../../models/taskCollectionPoint';
import { ITaskCollection } from '../../../models/taskCollection';
import useOnScreen from '../../../utils/useOnScreen';
import { _isAdmin } from '../../../store/selectors/App';
import { useSelector } from 'react-redux';

interface TaskCollectionPointListItemProps {
  isSelected: boolean;
  taskCollectionPoint: ITaskCollectionPoint;
  toggleTask: (taskCollection: ITaskCollection, tcpId: number) => void;
  toggleAllTasks: () => void;
  onClickPoint: () => void;
  onSelect: () => void;
}

function getCompleteStatus(collectionPoint: ITaskCollectionPoint) {
  let complete = true;
  for (const tc of collectionPoint.task_collection) {
    if (!tc.complete) {
      complete = false;
      return complete;
    }
  }
  return complete;
}

export const TaskCollectionPointListItem = (
  props: TaskCollectionPointListItemProps
) => {
  const {
    isSelected,
    taskCollectionPoint: collectionPoint,
    toggleTask,
    toggleAllTasks,
    onClickPoint,
    onSelect,
  } = props;

  const refTaskPoint = React.useRef(null);
  const toggleAll = (event: any) => {
    event.stopPropagation();
    toggleAllTasks();
  };
  const isVisible = useOnScreen(refTaskPoint);
  const toggleCollection = (taskCollection: ITaskCollection) =>
    toggleTask(taskCollection, collectionPoint.id);

  const complete = getCompleteStatus(collectionPoint);
  const isAdmin: boolean = useSelector(_isAdmin);

  React.useEffect(() => {
    if (!isVisible && isSelected && refTaskPoint.current) {
      (refTaskPoint.current as Element).scrollIntoView();
    }
  }, [isSelected, refTaskPoint]);

  const handleClickITem = () => {
    onSelect();
    onClickPoint();
  };

  let toggleAllButton = null;
  let toggleGarbageButtons = collectionPoint.task_collection.map(
    (taskCollection) => (
      <Button
        key={taskCollection.id}
        m={0.5}
        fontSize={10}
        h={8}
        p={0}
        variant={taskCollection.complete ? 'solid' : 'outline'}
      >
        {taskCollection.garbage.name}
      </Button>
    )
  );
  if (isAdmin) {
    toggleAllButton = (
      <VStack p={1}>
        <Button
          variant={complete ? 'solid' : 'outline'}
          colorScheme='blue'
          size='xs'
          onClick={toggleAll}
        >
          <FaCheck />
        </Button>
      </VStack>
    );

    toggleGarbageButtons = collectionPoint.task_collection.map(
      (taskCollection) => (
        <Button
          key={taskCollection.id}
          onClick={() => toggleCollection(taskCollection)}
          m={0.5}
          fontSize={10}
          h={8}
          p={0}
          variant={taskCollection.complete ? 'solid' : 'outline'}
        >
          {taskCollection.garbage.name}
        </Button>
      )
    );
  }

  return (
    <Box
      key={collectionPoint.id}
      p={1}
      my={2}
      fontSize='0.8rem'
      borderWidth='1px'
      userSelect='none'
      backgroundColor={isSelected ? 'gray.300' : 'white'}
      ref={refTaskPoint}
      cursor='pointer'
      onClick={handleClickITem}
    >
      <HStack align='flex-start'>
        <VStack align='stretch' p={1} paddingX={0} flex={1}>
          <HStack>
            <Text>{collectionPoint.sequence}</Text>
            <Text>{collectionPoint.name} </Text>
          </HStack>
          <Text textAlign='left'>{collectionPoint.memo}</Text>
        </VStack>
      </HStack>
      <HStack>
        {toggleAllButton}
        {toggleGarbageButtons}
      </HStack>
    </Box>
  );
};
