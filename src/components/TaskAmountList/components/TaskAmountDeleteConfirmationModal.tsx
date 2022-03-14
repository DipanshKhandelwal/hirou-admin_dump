import * as React from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
} from '@chakra-ui/react';
import { ITaskAmountItem } from '../../../models/taskAmountItem';
import { ITaskAmount } from '../../../models/taskAmount';
import { TaskAmountTable } from './TaskAmountTable';
import { TaskAmountItemTable } from './TaskAmountItemTable';

interface TaskAmountDeleteConfirmationModalProps {
  taskAmountItem?: ITaskAmountItem;
  taskAmount?: ITaskAmount;
  isOpen: boolean;
  cancelRef: any;
  onCancel: () => void;
  onAccept: () => void;
}

export const TaskAmountDeleteConfirmationModal = (
  props: TaskAmountDeleteConfirmationModalProps
) => {
  const { isOpen, cancelRef, onCancel, onAccept, taskAmount, taskAmountItem } =
    props;

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Task Amount ?
          </AlertDialogHeader>
          <AlertDialogBody>
            This functions is irreversible
            {taskAmountItem ? (
              <TaskAmountItemTable taskAmountItem={taskAmountItem} />
            ) : (
              <TaskAmountTable taskAmount={taskAmount} />
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              キャンセル
            </Button>
            <Button colorScheme='red' onClick={onAccept} ml={3}>
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
