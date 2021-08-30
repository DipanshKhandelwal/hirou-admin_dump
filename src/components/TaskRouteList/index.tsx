import * as React from "react"
import {
  Container,
  Heading,
  Table, Thead, Tbody, Tr, Th, Td,
  HStack,
  Spinner,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "../../services/navigation"
import { handleFetchTaskRoute } from "../../store/thunks/TaskRoute"
import { _taskRoute } from "../../store/selectors/TaskRoute"
import { ITaskRoute } from "../../models/taskRoute"

export const TaskRouteList = () => {
  const taskRoutesData: any = useSelector(_taskRoute)

  useEffect(() => {
    handleFetchTaskRoute()
  }, [])

  const selectTaskRoute = (taskRouteId: number) => navigate(`${taskRouteId}`)

  let content = <Spinner />
  if (taskRoutesData.isLoaded) {
    content = (
      <Table size="sm" variant='simple' >
        <Thead>
          <Tr>
            <Th>S No.</Th>
            <Th>Id</Th>
            <Th>ルート名</Th>
            <Th>date</Th>
          </Tr>
        </Thead>
        <Tbody >
          {taskRoutesData?.data?.map((taskRoute: ITaskRoute, idx: number) => (
            <Tr
              key={taskRoute.id}
              _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
              onClick={() => selectTaskRoute(taskRoute.id)}
            >
              <Td>{idx + 1}</Td>
              <Td>{taskRoute.id}</Td>
              <Td>{taskRoute.name}</Td>
              <Td>{taskRoute.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  return (
    <Container maxW="container.lg">
      <HStack marginBottom={5} justifyContent='space-between' >
        <Heading textAlign='start' >TaskRouteList</Heading>
      </HStack>
      {content}
    </Container>
  )
}
