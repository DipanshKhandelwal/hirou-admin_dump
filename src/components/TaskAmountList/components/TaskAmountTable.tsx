import * as React from 'react';
import {
  Table, Tbody, Tr, Td,
} from "@chakra-ui/react"
import { ITaskAmount } from '../../../models/taskAmount';

export const TaskAmountTable = ({
  taskAmount,
}: {
  taskAmount?: ITaskAmount;
}) => {
  if (!taskAmount) return null
  return (
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

  );
};

