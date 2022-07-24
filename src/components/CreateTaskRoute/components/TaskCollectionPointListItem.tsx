import * as React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { ITaskCollectionPoint } from '../../../models/taskCollectionPoint';
import { ITaskCollection } from '../../../models/taskCollection';
import useOnScreen from '../../../utils/useOnScreen';
import { _isAdmin } from '../../../store/selectors/App';
import { useSelector } from 'react-redux';
import { GarbageButton, GarbageButtonTypes } from './TaskCollectionPointDetailBottomSheet/GarbageButton';

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

  let toggleGarbageButtons = collectionPoint.task_collection.map(
    (taskCollection) => (
      <GarbageButton
        size={GarbageButtonTypes.small}
        taskCollection={taskCollection}
        key={taskCollection.id}
        onClick={isAdmin ? () => toggleCollection(taskCollection) : undefined}
      />
    )
  );

  return (
    <Box
      key={collectionPoint.id}
      p={2}
      px={3}
      fontSize='.9rem'
      borderWidth='1px'
      userSelect='none'
      backgroundColor={isSelected ? 'gray.300' : 'white'}
      ref={refTaskPoint}
      cursor='pointer'
      onClick={handleClickITem}
    >
      <HStack p={1} paddingX={0} flex={1} >
        <Text fontWeight={'bold'} >{collectionPoint.sequence}.</Text>
        <Text>{collectionPoint.name} </Text>
      </HStack>
      <HStack>
        {toggleGarbageButtons}
      </HStack>
    </Box>
  );
};
