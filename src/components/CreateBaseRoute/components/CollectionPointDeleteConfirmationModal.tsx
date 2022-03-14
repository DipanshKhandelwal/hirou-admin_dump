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

interface CollectionPointDeleteConfirmationModalProps {
  isOpen: boolean;
  cancelRef: any;
  onCancel: () => void;
  onAccept: () => void;
}

export const CollectionPointDeleteConfirmationModal = (
  props: CollectionPointDeleteConfirmationModalProps
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
            Delete Collection Point ?
          </AlertDialogHeader>
          <AlertDialogBody>This functions is irreversible</AlertDialogBody>
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
