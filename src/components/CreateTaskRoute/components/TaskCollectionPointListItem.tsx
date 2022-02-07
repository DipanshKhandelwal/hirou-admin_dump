import * as React from 'react';
import { Box, Text, Image, HStack, VStack, Button } from '@chakra-ui/react';
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
  const toggleAll = () => toggleAllTasks();
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

  const onItemClick = () => !isAdmin && onSelect();

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
      onClick={onItemClick}
    >
      <HStack align='flex-start'>
        <Image
          minHeight='90px'
          minWidth='90px'
          height='90px'
          width='90px'
          src={collectionPoint.image}
          alt='image'
          objectFit='contain'
          fontSize='10px'
          backgroundColor='gray.100'
          onClick={onClickPoint}
          cursor='pointer'
        />
        <VStack align='stretch' p={1} paddingX={0} flex={1}>
          <HStack>
            <Text>{collectionPoint.sequence}</Text>
            <Text>{collectionPoint.name} </Text>
          </HStack>
          <Text textAlign='left'>{collectionPoint.memo}</Text>
        </VStack>

        {toggleAllButton}
      </HStack>
      <div>{toggleGarbageButtons}</div>
    </Box>
  );
};
