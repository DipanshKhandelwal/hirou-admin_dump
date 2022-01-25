import * as React from 'react';
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
} from '@chakra-ui/react';
import { ITaskAmount } from '../../models/taskAmount';

interface TaskAmountDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskAmount?: ITaskAmount;
}

export const TaskAmountDetailModal = (props: TaskAmountDetailModalProps) => {
  const { isOpen, onClose, taskAmount } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Amount Details</ModalHeader>
        <ModalBody>
          <Table size='sm' border='1px' borderColor='blue.100' my={3}>
            <Tbody>
              <Tr>
                <Td fontWeight='bold'>Id</Td>
                <Td>{taskAmount?.id}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold'>Vehicle</Td>
                <Td>{taskAmount?.vehicle?.registration_number}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold'>作成日</Td>
                <Td>{taskAmount?.timestamp}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold'>Work Type</Td>
                <Td>{taskAmount?.work_type ?? '-'}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold'>Deal Type</Td>
                <Td>{taskAmount?.deal_type ?? '-'}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold'>Memo</Td>
                <Td>{taskAmount?.memo ?? '-'}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold'>User</Td>
                <Td>{taskAmount?.user?.username ?? '-'}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};
