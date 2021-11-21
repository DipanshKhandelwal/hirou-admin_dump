import * as React from "react"
import {
  Container,
  Heading,
  Table, Thead, Tbody, Tr, Th, Td,
  HStack,
  useToast,
  Spinner,
  Button,
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
import { FaRoute } from 'react-icons/fa'
import { ITaskAmount } from "../../models/taskAmount"
import { getTaskAmounts } from "../../services/apiRequests/taskAmounts"
import { TaskAmountList } from "../TaskAmountList"
import { TaskRouteDetailsTable } from "./components/TaskRouteDetailsTable"

export const TaskRouteDetail = () => {
  let { taskRouteId }: { taskRouteId: string } = useParams();
  const selectedRouteId = Number(taskRouteId)

  const toast = useToast()
  const taskRoutesData: number = useSelector(_taskRoute)

  const [taskreports, setTaskReports] = useState<ITaskReport[]>([]);
  const [taskAmounts, setTaskAmounts] = useState<ITaskAmount[]>([]);

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

    async function getAmounts() {
      try {
        const amounts: ITaskAmount[] = await getTaskAmounts(selectedRouteId);
        setTaskAmounts(amounts);
      }
      catch (e) {
        toast({
          title: "Error fetching task amounts",
          description: "",
          status: "error",
        });
      }
    }

    init()
    getReports()
    getAmounts()
  }, [selectedRouteId, setTaskReports, toast])

  const goToRouteMap = () => navigate(`/task-routes/map/${selectedRouteId}`)

  if (!route) return <Spinner />

  return (
    <Container maxW="container.lg">
      <HStack marginBottom={5} justifyContent='space-between' >
        <Heading textAlign='start' >{route.name ?? 'Task name'}</Heading>
      </HStack>

      <HStack my={4} >
        <Button alignSelf='flex-start' rightIcon={<FaRoute />} variant="outline" onClick={goToRouteMap} >Task Map</Button>
      </HStack>
      <TaskRouteDetailsTable route={route} />

      <HStack my={6} justifyContent='space-between' >
        <Heading size='lg' textAlign='start' >Reports</Heading>
        <Button onClick={() => { }} >Add reports</Button>
      </HStack>
      <TaskReportList reportsList={taskreports} />

      <HStack my={6} justifyContent='space-between' >
        <Heading size='lg' textAlign='start' >Amounts</Heading>
        <Button onClick={() => { }} >Add Amounts</Button>
      </HStack>
      <TaskAmountList amountsList={taskAmounts} />

    </Container>
  )
}
