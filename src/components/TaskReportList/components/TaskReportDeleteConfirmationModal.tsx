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
import { TaskReportTable } from '../../TaskReportTable';
import { ITaskReport } from '../../../models/taskReport';

interface TaskReportDeleteConfirmationModalProps {
  taskReport?: ITaskReport;
  isOpen: boolean;
  cancelRef: any;
  onCancel: () => void;
  onAccept: () => void;
}

export const TaskReportDeleteConfirmationModal = (
  props: TaskReportDeleteConfirmationModalProps
) => {
  const { isOpen, cancelRef, onCancel, onAccept, taskReport } = props;

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Task Report ?
          </AlertDialogHeader>
          <AlertDialogBody>
            This functions is irreversible
            <TaskReportTable taskReport={taskReport} />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onAccept} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
