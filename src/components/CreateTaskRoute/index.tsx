import * as React from "react"
import {
  Box,
  Flex,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react"

import { getTaskRoute } from '../../services/apiRequests/taskRoute'

import { useState } from "react"
import { TaskCollectionPointListItem } from "./components/TaskCollectionPointListItem"
import { useEffect } from "react"
import TaskRouteMap from "./components/TaskRouteMap"
import { useParams } from "react-router-dom"
import { navigate } from "../../services/navigation"
import { ITaskRoute } from "../../models/taskRoute"
import { ITaskCollectionPoint } from "../../models/taskCollectionPoint"

export const CreateTaskRoute = () => {
  const [localCollectionPoints, setLocalCollectionPoints] = useState<ITaskCollectionPoint[]>([])
  const toast = useToast()

  const [route, setRoute] = useState<ITaskRoute | null>(null)

  let { taskRouteId }: { taskRouteId: string } = useParams();
  const selectedRouteId = Number(taskRouteId)

  useEffect(() => {
    async function init() {
      // try fetching the task route else redirect to list
      try {
        const data = await getTaskRoute(selectedRouteId);
        setRoute(data)
      }
      catch (e) {
        toast({
          title: "Incorrct route",
          description: "please select an existing route",
          status: "error",
        })
        navigate('/list')
      }
    }

    init()
  }, [selectedRouteId, toast])

  useEffect(() => {
    const cps = route?.task_collection_point.sort((a: ITaskCollectionPoint, b: ITaskCollectionPoint) => {
      return a.sequence - b.sequence
    })
    setLocalCollectionPoints(cps ?? [])
  }, [route])

  const onCollectionComplete = () => { }

  // const getCPFromId = (cpId: number) => route?.task_collection_point.find((cp: ITaskCollectionPoint) => cp.id === cpId)

  const collectionPointsList = localCollectionPoints?.map((taskCollectionPoint: ITaskCollectionPoint, index: number) => (
    <TaskCollectionPointListItem
      onComplete={onCollectionComplete}
      key={taskCollectionPoint.id}
      taskCollectionPoint={taskCollectionPoint}
    />
  ))

  return (
    <Flex backgroundColor='white' height='inherit' >
      <Box flex="1" minWidth='300px' overflowY='scroll'>
        {localCollectionPoints.length === 0 && <Text>No Collection Points</Text>}
        {collectionPointsList}
      </Box>
      <Center flex="4"  >
        <TaskRouteMap
          baseRoute={route}
        />
      </Center>
    </Flex>
  )
}
