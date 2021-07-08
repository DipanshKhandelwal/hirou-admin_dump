import * as React from "react"
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Button
} from "@chakra-ui/react"

interface BaseRouteDeleteConfirmationModalProps {
  isOpen: boolean
  cancelRef: any
  onCancel: () => void
  onAccept: () => void
}

export const BaseRouteDeleteConfirmationModal = (props: BaseRouteDeleteConfirmationModalProps) => {
  const { isOpen, cancelRef, onCancel, onAccept } = props

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Base Route ?
          </AlertDialogHeader>
          <AlertDialogBody>
            This functions is irreversible
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onAccept} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}