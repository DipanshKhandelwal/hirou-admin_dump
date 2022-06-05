import * as React from 'react';
import { Image, Center, HStack, Text } from '@chakra-ui/react';
import { ITaskCollectionPoint } from '../../models/taskCollectionPoint';
import { ImCheckmark, ImClock } from 'react-icons/im';
import { getJapaneseDateString } from '../../utils/date';

interface TaskCollectionPointDetailProps {
  taskCollectionPoint?: ITaskCollectionPoint | null;
}

export const TaskCollectionPointDetail = (
  props: TaskCollectionPointDetailProps
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
        <HStack
          width='100%'
          alignSelf='center'
          my={3} key={taskCollection.id}>
          <HStack flex={2} justify='end'>
            <Text fontSize={'12'}>{taskCollection.garbage.name}</Text>
            {taskCollection.complete ? (
              <ImCheckmark color='green' />
            ) : (
              <ImClock color='#FFB81D' />
            )}
          </HStack>
          <Text flex={3} justify='start' fontSize={'12'}>{!!taskCollection.complete ? dateTimeJapanese : ''}</Text>
        </HStack>
      );
    });
  }

  if (!taskCollectionPoint) {
    return null;
  }
  return (
    <HStack
      flexDirection={'column'}
      maxWidth='300'
      marginTop='2'
      paddingTop='2'
      paddingBottom='2'
      borderTop={'1px solid #d0d7de'}
    >
      <HStack justifyContent={'center'} width='full' marginBottom={4}>
        <Text fontSize={'16'} fontWeight='bold'>
          {taskCollectionPoint?.sequence}
        </Text>
        <Text fontSize={'16'} fontWeight='bold'>
          {taskCollectionPoint?.name}
        </Text>
      </HStack>
      <HStack>
        <Center>
          <Image
            cursor='pointer'
            boxSize='120px'
            borderRadius={5}
            objectFit='cover'
            borderWidth='2px'
            borderColor='black'
            borderStyle='solid'
            src={
              taskCollectionPoint?.image ?? 'https://via.placeholder.com/150'
            }
            alt='image'
          />
        </Center>
      </HStack>
      {content}
    </HStack>
  );
};
