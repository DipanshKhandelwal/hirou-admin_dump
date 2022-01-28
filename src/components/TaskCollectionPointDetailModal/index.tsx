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
import { ImCheckmark, ImRadioChecked } from 'react-icons/im';

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
        const dateJapan = new Date(taskCollection.timestamp);
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        } as any;

        dateTimeJapanese = dateJapan.toLocaleDateString(
          'ja-JP-u-ca-japanese',
          options
        );
      }
      return (
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
              <ImRadioChecked color='#FFB81D' />
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
        <ModalHeader>{taskCollectionPoint?.name}</ModalHeader>
        <ModalBody>
          <Center
            borderWidth='2px'
            borderColor='red.400'
            borderStyle='solid'
            borderRadius='5px'
          >
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
