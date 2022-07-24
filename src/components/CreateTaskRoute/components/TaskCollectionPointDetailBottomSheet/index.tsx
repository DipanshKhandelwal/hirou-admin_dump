import * as React from 'react';
import { Image, Center, HStack, Text, VStack, SimpleGrid, Box, Button } from '@chakra-ui/react';
import { ITaskCollectionPoint } from '../../../../models/taskCollectionPoint';
import { ImCheckmark, ImClock } from 'react-icons/im';
import { getJapaneseDateString } from '../../../../utils/date';
import { BottomSheet } from 'react-spring-bottom-sheet'

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css'

import './styles.css'
import { FaCheck } from 'react-icons/fa';
import { GarbageButton } from './GarbageButton';
import { ToggleAllButton } from './ToggleAllButton';


interface TaskCollectionPointDetailBottomSheetProps {
  taskCollectionPoint?: ITaskCollectionPoint | null;
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

export const TaskCollectionPointDetailBottomSheet = (
  props: TaskCollectionPointDetailBottomSheetProps
) => {
  const { taskCollectionPoint } = props;

  let content = null;

  if (taskCollectionPoint) {
    content = taskCollectionPoint.task_collection.map((taskCollection) => {
      let dateTimeJapanese = '';
      if (taskCollection.complete && taskCollection.timestamp) {
        dateTimeJapanese = getJapaneseDateString(taskCollection.timestamp);
      }
      return (
        <HStack justifyContent='space-between' my={3} key={taskCollection.id}>
          <HStack>
            <Text fontSize={'12'}>{taskCollection.garbage.name}</Text>
            {taskCollection.complete ? (
              <ImCheckmark color='green' />
            ) : (
              <ImClock color='#FFB81D' />
            )}
          </HStack>
          {!!taskCollection.complete && (
            <Text fontSize={'12'}>{dateTimeJapanese}</Text>
          )}
        </HStack>
      );
    });
  }

  if (!taskCollectionPoint) {
    return null;
  }

  const complete = getCompleteStatus(taskCollectionPoint);

  let toggleAllButton = (
    <VStack p={1}>
      <ToggleAllButton
        complete={complete}

      />

    </VStack>
  );
  let toggleGarbageButtons = taskCollectionPoint.task_collection.map(
    (taskCollection) => (
      <GarbageButton
        taskCollection={taskCollection}
        key={taskCollection.id}
      />

    )
  );

  return (
    <BottomSheet
      open
      expandOnContentDrag
      blocking={false}
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 10,
        maxHeight * 0.5,
        maxHeight / 3.6,
      ]}
    >
      <HStack
        mx={2}
        ml={4}
        flex={1}
      >
        <Image
          flex={1}
          mt='1%'
          alignSelf='flex-start'
          cursor='pointer'
          maxW='18%'
          borderRadius={5}
          objectFit='cover'
          borderWidth='1px'
          borderColor='black'
          borderStyle='solid'
          src={
            taskCollectionPoint?.image ?? 'https://via.placeholder.com/150'
          }
          alt='image'
        />

        <VStack flex={4} px={2} >
          {/* <Text fontSize={'16'} fontWeight='bold'>
            {taskCollectionPoint?.sequence}
          </Text> */}
          <Text alignSelf='flex-start' fontSize={'16'} fontWeight='bold'>
            {taskCollectionPoint?.name}
          </Text>

          <HStack width='100%' flex={1} >
            <SimpleGrid flex={1} columns={4} my={2} spacing={2}>
              {toggleGarbageButtons}
              {/* <Box bg='red' flex={1} height={16}></Box>
              <Box bg='red' flex={1} height={16}></Box>
              <Box bg='red' flex={1} height={16}></Box>
              <Box bg='red' flex={1} height={16}></Box>
              <Box bg='red' flex={1} height={16}></Box>
              <Box bg='red' flex={1} height={16}></Box>
              <Box bg='red' flex={1} height={16}></Box>
              <Box bg='red' flex={1} height={16}></Box> */}
            </SimpleGrid>
            {toggleAllButton}
          </HStack>
        </VStack>
      </HStack>
      {/* {content} */}
    </BottomSheet >
  );
};
