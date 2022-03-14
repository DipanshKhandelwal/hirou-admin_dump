import * as React from 'react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { ITaskAmountItem } from '../../../models/taskAmountItem';

export const TaskAmountItemTable = ({
  taskAmountItem,
}: {
  taskAmountItem?: ITaskAmountItem;
}) => {
  if (!taskAmountItem) return null;
  return (
    <Table size='sm' border='1px' borderColor='blue.100' my={3}>
      <Tbody>
        <Tr>
          <Td fontWeight='bold'>Id</Td>
          <Td>{taskAmountItem?.id}</Td>
        </Tr>
        <Tr>
          <Td fontWeight='bold'>車両</Td>
          <Td>{taskAmountItem?.garbage.name}</Td>
        </Tr>
        <Tr>
          <Td fontWeight='bold'>Gross Weight</Td>
          <Td>{taskAmountItem.gross_weight}</Td>
        </Tr>
        <Tr>
          <Td fontWeight='bold'>Vehicle Weight</Td>
          <Td>{taskAmountItem.vehicle_weight}</Td>
        </Tr>
        <Tr>
          <Td fontWeight='bold'>Net Weight</Td>
          <Td>{taskAmountItem.net_weight}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
