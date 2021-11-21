import * as React from "react"
import {
  Table, Thead, Tbody, Tr, Th, Td,
} from "@chakra-ui/react"
import { ITaskRoute } from "../../../models/taskRoute"
import { IGarbage } from "../../../models/garbage"


export const TaskRouteDetailsTable = ({ route }: { route: ITaskRoute }) => {
  return (
    <Table size="sm" variant='simple' >
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>ルート名</Th>
          <Th>顧客</Th>
          <Th>品目</Th>
          <Th>date</Th>
        </Tr>
      </Thead>
      <Tbody >
        <Tr key={route.id} _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}>
          <Td>{route.id}</Td>
          <Td>{route.name}</Td>
          <Td>{route.customer?.name ?? '--'}</Td>
          <Td>
            {route.garbage.map((_garbage: IGarbage) => _garbage.name).join(', ')}
          </Td>
          <Td>{route.date}</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
