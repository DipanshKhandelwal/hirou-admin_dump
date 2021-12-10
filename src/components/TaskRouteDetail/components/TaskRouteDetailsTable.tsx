import * as React from "react"
import {
  Table, Thead, Tbody, Tr, Th, Td, HStack, Button
} from "@chakra-ui/react"
import { ITaskRoute } from "../../../models/taskRoute"
import { IGarbage } from "../../../models/garbage"
import { navigate } from "../../../services/navigation"
import { FaRoute } from 'react-icons/fa'

export const TaskRouteDetailsTable = ({ route }: { route: ITaskRoute }) => {

  const goToRouteMap = () => navigate(`/task-routes/map/${route.id}`)

  return (
    <>
      <HStack my={4} >
        <Button alignSelf='flex-start' rightIcon={<FaRoute />} variant="outline" onClick={goToRouteMap} >Task Map</Button>
      </HStack>
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
    </>
  )
}
