import * as React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Button,
} from '@chakra-ui/react';
import { ITaskRoute } from '../../../models/taskRoute';
import { IGarbage } from '../../../models/garbage';
import { navigate } from '../../../services/navigation';
import { FaRoute } from 'react-icons/fa';
import { ITaskCollectionPoint } from '../../../models/taskCollectionPoint';
import { ITaskCollection } from '../../../models/taskCollection';
import { getDateTimeHour } from '../../../utils/date';
import { formatTaskName } from '../../../utils/formatName';

export const TaskRouteDetailsTable = ({ route }: { route: ITaskRoute }) => {
  const goToRouteMap = () => navigate(`/task-routes/map/${route.id}`);
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
      <HStack my={4}>
        <Button
          alignSelf='flex-start'
          rightIcon={<FaRoute />}
          variant='outline'
          onClick={goToRouteMap}
        >
          マップを開く
        </Button>
      </HStack>
      <Table
        size='sm'
        variant='simple'
        border='1px'
        borderColor='blue.100'
        borderStyle='solid'
      >
        <Thead>
          <Tr>
            <Th
              padding={2}
              borderWidth='1px'
              borderColor='blue.100'
              borderStyle='dotted'
            >
              {route.id}
            </Th>
            <Th
              padding={2}
              borderWidth='1px'
              borderColor='blue.100'
              borderStyle='dotted'
            >
              {formatTaskName(route.name)}
            </Th>
            {garbages?.map((item: IGarbage) => (
              <Th
                padding={2}
                borderWidth='1px'
                borderColor='blue.100'
                borderStyle='dotted'
              >
                {item.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {task_collection_points.map((item: ITaskCollectionPoint) => (
            <Tr
              key={item.id}
              _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
            >
              <Td
                padding={2}
                borderWidth='1px'
                borderColor='blue.100'
                borderStyle='dotted'
              >
                {item.sequence}
              </Td>
              <Td
                padding={2}
                borderWidth='1px'
                borderColor='blue.100'
                borderStyle='dotted'
              >
                {item.name}
              </Td>
              {garbages?.map((garbage: IGarbage) => (
                <Th
                  padding={2}
                  borderWidth='1px'
                  borderColor='blue.100'
                  borderStyle='dotted'
                >
                  {getTimeCollection(garbage, item.task_collection)}
                </Th>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
