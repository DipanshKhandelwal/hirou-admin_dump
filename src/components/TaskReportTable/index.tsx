import * as React from 'react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { ITaskReport } from '../../models/taskReport';

export const TaskReportTable = ({
  taskReport,
}: {
  taskReport?: ITaskReport;
}) => {
  if (!taskReport) return null;
  return (
    <Table size='sm' border='1px' borderColor='blue.100' my={3}>
      <Tbody>
        <Tr>
          <Td fontWeight='bold'>Id</Td>
          <Td>{taskReport?.id}</Td>
        </Tr>
        <Tr>
          <Td fontWeight='bold'>内容</Td>
          <Td>{taskReport?.description}</Td>
        </Tr>
        <Tr>
          <Td fontWeight='bold'>報告種別</Td>
          <Td>{taskReport?.report_type.name}</Td>
        </Tr>
        <Tr>
          <Td fontWeight='bold'>作成日</Td>
          <Td>{taskReport?.timestamp}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
