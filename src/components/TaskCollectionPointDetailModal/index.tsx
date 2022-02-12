import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Image,
  ModalBody,
  Center,
  HStack,
  Text,
} from '@chakra-ui/react';
import { ITaskCollectionPoint } from '../../models/taskCollectionPoint';
import { ImCheckmark, ImClock } from 'react-icons/im';
import { getJapaneseDateString } from '../../utils/date';

interface TaskCollectionPointDetailModalProps {
  onClose: () => void;
  taskCollectionPoint?: ITaskCollectionPoint;
}

export const TaskCollectionPointDetailModal = (
  props: TaskCollectionPointDetailModalProps
) => {
  const { onClose, taskCollectionPoint } = props;

  let content = null;

  if (taskCollectionPoint) {
    content = taskCollectionPoint.task_collection.map((taskCollection) => {
      let dateTimeJapanese = '';
      if (taskCollection.complete && taskCollection.timestamp) {
        dateTimeJapanese = getJapaneseDateString(taskCollection.timestamp);
      }
      return (
        <HStack
          justifyContent='space-between'
          my={3}
          key={taskCollection.id}
        >
          <HStack>
            <Text>{taskCollection.garbage.name}</Text>
            {taskCollection.complete ? (
              <ImCheckmark color='green' />
            ) : (
              <ImClock color='#FFB81D' />
            )}
          </HStack>
          {!!taskCollection.complete && (
            <Text fontSize='medium'>{dateTimeJapanese}</Text>
          )}
        </HStack>
      );
    });
  }

  return (
    <Modal isOpen={!!taskCollectionPoint} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>{taskCollectionPoint?.sequence}</Text>
            <Text>{taskCollectionPoint?.name}</Text>
          </HStack>
        </ModalHeader>
        <ModalBody>
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
          {content}
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};
