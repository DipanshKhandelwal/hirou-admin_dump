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

interface UpdateConfirmationModalProps {
  isOpen: boolean;
  cancelRef: any;
  onCancel: () => void;
  onAccept: () => void;
}

export const UpdateConfirmationModal = (
  props: UpdateConfirmationModalProps
) => {
  const { isOpen, cancelRef, onCancel, onAccept } = props;

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Update sequence
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              キャンセル
            </Button>
            <Button colorScheme='green' onClick={onAccept} ml={3}>
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
