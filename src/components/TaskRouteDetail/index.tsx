import * as React from "react"
import {
  Container,
  Heading,
  Table, Thead, Tbody, Tr, Th, Td,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "../../services/navigation"
import { handleFetchUpdatedTaskRoute } from "../../store/thunks/TaskRoute"
import { _taskRoute } from "../../store/selectors/TaskRoute"
import { ITaskRoute } from "../../models/taskRoute"
import { useParams } from "react-router-dom"
import { useMemo } from "react"
import { useState } from "react"
import { getTaskReports } from "../../services/apiRequests/taskReports"
import { ITaskReport } from "../../models/taskReport"
import { TaskReportList } from "../TaskReportList"
import { IGarbage } from "../../models/garbage"

export const TaskRouteDetail = () => {
  let { taskRouteId }: { taskRouteId: string } = useParams();
  const selectedRouteId = Number(taskRouteId)

  const toast = useToast()
  const taskRoutesData: number = useSelector(_taskRoute)

  const [taskreports, setTaskReports] = useState<ITaskReport[]>([]);

  const route: ITaskRoute = useMemo(() => {
    const taskRoute = taskRoutesData.data.find((taskRoute: ITaskRoute) => taskRoute.id === selectedRouteId)
    return taskRoute
  }, [taskRoutesData, selectedRouteId])

  useEffect(() => {
    async function init() {
      // try fetching the route else redirect to list
      try { await handleFetchUpdatedTaskRoute(selectedRouteId) }
      catch (e) {
        toast({
          title: "Incorrct route",
          description: "please select an existing task route",
          status: "error",
        })
        navigate('/list')
      }
    }

    async function getReports() {
      try {
        const reportsData: ITaskReport[] = await getTaskReports(selectedRouteId);
        setTaskReports(reportsData);
      }
      catch (e) {
        toast({
          title: "Error fetching task reports",
          description: "",
          status: "error",
        });
      }
    }

    init()
    getReports()
  }, [selectedRouteId, setTaskReports, toast])

  if (!route) return <Spinner />

  return (
    <Container maxW="container.lg">
      <HStack marginBottom={5} justifyContent='space-between' >
        <Heading textAlign='start' >{route.name ?? 'Task name'}</Heading>
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

    </Container>
  )
}
