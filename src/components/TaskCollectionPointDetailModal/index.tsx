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
import { ImCheckmark, ImCross } from 'react-icons/im';

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
    content = taskCollectionPoint.task_collection.map((taskCollection) => (
      <HStack
        justifyContent='space-between'
        my={3}
        key={taskCollection.id}
        onClick={() => console.log('a', taskCollection)}
      >
        <HStack>
          <Text>{taskCollection.garbage.name}</Text>
          {!!taskCollection.complete ? (
            <ImCheckmark color='green' />
          ) : (
            <ImCross color='red' />
          )}
        </HStack>
        {!!taskCollection.complete && (
          <Text fontSize='medium'>{taskCollection.timestamp}</Text>
        )}
      </HStack>
    ));
  }

  return (
    <Modal isOpen={!!taskCollectionPoint} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{taskCollectionPoint?.name}</ModalHeader>
        <ModalBody>
          <Center>
            <Image
              cursor='pointer'
              boxSize='120px'
              borderRadius={5}
              objectFit='cover'
              src={
                taskCollectionPoint?.image ?? 'https://via.placeholder.com/150'
              }
              alt='image'
            />
          </Center>
          {content}
          <HStack mt={5}>
            <Text mr={5}>ID:{taskCollectionPoint?.id}</Text>
            <Text>Seq: {taskCollectionPoint?.sequence}</Text>
          </HStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};
