import * as React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tr,
  Tbody,
  Td,
  Table,
} from "@chakra-ui/react"
import { ITaskAmount } from "../../models/taskAmount";

interface TaskAmountDetailModalProps {
  isOpen: boolean
  onClose: () => void
  taskAmount?: ITaskAmount
}

export const TaskAmountDetailModal = (props: TaskAmountDetailModalProps) => {
  const { isOpen, onClose, taskAmount } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Amount Details</ModalHeader>
        <ModalBody>
          <Table size='sm' border="1px" borderColor="blue.100" my={3}  >
            <Tbody>
              <Tr>
                <Td fontWeight='bold' >Id</Td>
                <Td>{taskAmount?.id}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >Type</Td>
                <Td>{taskAmount?.garbage.name}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >Timestamp</Td>
                <Td>{taskAmount?.timestamp}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >Amount</Td>
                <Td>{taskAmount?.amount}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' >Memo</Td>
                <Td>{taskAmount?.memo || '-'}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal >
  )
}
