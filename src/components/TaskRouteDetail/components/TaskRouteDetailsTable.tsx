import * as React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { ITaskRoute } from '../../../models/taskRoute';
import { IGarbage } from '../../../models/garbage';
import { ITaskCollectionPoint } from '../../../models/taskCollectionPoint';
import { ITaskCollection } from '../../../models/taskCollection';
import { getDateTimeHour } from '../../../utils/date';

function heading(text: string) {
  return (
    <Th
      padding={2}
      borderWidth='1px'
      borderColor='blue.100'
      borderStyle='dotted'
    >
      {text}
    </Th>
  )
}

function value(text: string | number) {
  return (
    <Td
      padding={2}
      borderWidth='1px'
      borderColor='blue.100'
      borderStyle='dotted'
    >
      {text}
    </Td>
  )
}

export const TaskRouteDetailsTable = ({ route }: { route: ITaskRoute }) => {
  const { task_collection_point, garbage: garbages } = route;
  const task_collection_points = task_collection_point.sort(
    (a: ITaskCollectionPoint, b: ITaskCollectionPoint) =>
      a.sequence - b.sequence
  );
  const getTimeCollection = (
    iGarbage: IGarbage,
    task_collections: Array<ITaskCollection>
  ) => {
    const item = task_collections.find(
      ({ garbage }) => garbage.id === iGarbage.id
    );
    if (!item) {
      return '-';
    }
    const { timestamp } = item;
    return timestamp ? getDateTimeHour(timestamp) : '-';
  };

  return (
    <>
      <Table
        size='sm'
        variant='simple'
        border='1px'
        borderColor='blue.100'
        borderStyle='solid'
      >
        <Thead>
          <Tr>
            {heading('集積所番号')}
            {heading('名前')}
            {heading('住所')}
            {garbages?.map((item: IGarbage) => heading(item.name))}
          </Tr>
        </Thead>
        <Tbody>
          {task_collection_points.map((item: ITaskCollectionPoint) => (
            <Tr
              key={item.id}
              _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
            >
              {value(item.sequence)}
              {value(item.name)}
              {value(item.address)}
              {garbages?.map((garbage: IGarbage) => value(getTimeCollection(garbage, item.task_collection)))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
